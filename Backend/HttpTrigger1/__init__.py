import logging

import azure.functions as func
import tempfile
# custom vision
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

# text to speech
from azure.cognitiveservices.speech import AudioDataStream, SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat
from azure.cognitiveservices.speech.audio import AudioOutputConfig


import os
import sys
import time
from io import BufferedReader
from io import BytesIO
import mimetypes

def main(req: func.HttpRequest) -> func.HttpResponse:
    subscription_key = ""
    region = "westeurope"
    endpoint = "https://mtcognitiveservices1.cognitiveservices.azure.com/"

    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    if (len(req.files) == 0):
        return func.HttpResponse("No file provided", status_code=400)
    elif (len(req.files) > 1):
        return func.HttpResponse("Only one file allowed", status_code=400)
    else: 
        allowed_files = 1
        i = 0
        for input_file in req.files.values():
            if(i < allowed_files):
                i+=1
                filename = input_file.filename
                contents = input_file.stream.read()

                file_like = BytesIO(contents)

                # description
                try:
                    description_result = computervision_client.describe_image_in_stream(file_like)
                except Exception as ex:
                    return func.HttpResponse(str(ex), status_code=400)

                #text to speech
                speech_config = SpeechConfig(subscription=subscription_key, region=region)
                speech_config.speech_synthesis_language = "en-US" # e.g. "de-DE"
                speech_config.set_speech_synthesis_output_format(SpeechSynthesisOutputFormat["Riff24Khz16BitMonoPcm"])

                synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=None)

                if (len(description_result.captions) == 0):
                    logging.info("No description detected.")
                    return func.HttpResponse("No description detected.", status_code=400)
                else:
                    caption = description_result.captions[0]
                    logging.info("'{}' with confidence {:.2f}%".format(caption.text, caption.confidence * 100))

                    result = synthesizer.speak_text_async(caption.text).get()
                    audio_data = result.audio_data
                    return func.HttpResponse(audio_data, mimetype='audio/wav')
                
