# PhotoDescriber

## Zespół:
Tomasz Stańczuk

Michał Gajda

## Opis projektu:
Celem naszego projektu było utworzenie aplikacji webowej pozwalającej na opis wgrywanych zdjęć w postaci audio.
Rozbudowana wersja aplikacji może służyć do pomocy osobą niewidomym.

## Funkcjonalności:
* wgrywanie zdjęć,
* przetwarzanie zdjęć przy pomocy custom vision,
* uzyskanie pliku audio z opisanego zdjęcia przy pomocy text to speech,
* odtwarzanie plików audio po stronie klienta.

## Architektura:
Frontend aplikacji zrealizowany przy pomocy React.js i jest uruchamiany na **App Service**, Api zostało zaimplementowane na **Azure Functions**, po stronie backendu wykorzystaliśmy **Cognitive Services: custom vision i text to speech**
![image](https://user-images.githubusercontent.com/58606334/142779079-e2d5772c-fccb-4844-a195-32bc777e1631.png)

## Schemat działania programu

1. Wszystko zaczyna się od otworzenia aplikacji klienta, to właśnie ona jest interfejsem użytkownika do wgrywania zdjęć i odtwarzania ich opisów audio.

Znajdziemy ją pod adresem: *https://projekt1-front.azurewebsites.net*

![image](https://user-images.githubusercontent.com/58606334/142779226-7a805b70-b5a6-423a-8ab4-bea499642652.png)

2. Użytkownik wciska przycisk **Upload**.

![image](https://user-images.githubusercontent.com/58606334/142779264-97a429ce-1339-4ba3-aa3e-61609fce4441.png)

3. Następnie wgrywa jakieś zdjęcie poprzez zrzucenie go do obszaru drag and drop, bądź w niego kliknięcie i wybranie pliku z systemu plików.

![image](https://user-images.githubusercontent.com/58606334/142779325-9f4771f4-dbe0-42e7-b5d5-0b6ab87024b7.png)

4. Ostatnim krokiem jest kliknięcie przycisku **Read** po czym zostanie przeczytany opis zdjęcia wygenerowany przez backend, to w tym momencie zostaje wysyłane rządanie na backend, 
jest ono obługiwane przez endpoint *https://projekt1-api.azurewebsites.net/api/HttpTrigger1*. Tak jak wcześniej było wspomniane, backend jest zrealizowany przy pomocy **Azure Functions**, to tam zdjęcie zostaje przetworzone i zostaje utworzony jego opis w postaci tekstu, do tego celu jest stosowane **custom vision**. Po utworzeniu tekstowego opisu zdjęcia jest ono zamieniane na audio przy pomocy **text to speech**. Po uzyskaniu zapisu audio jest on odsyłany do aplikacji klienckiej gdzie jest odtwarzany.

