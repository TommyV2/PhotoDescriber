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
Frontend aplikacji zrealizowany przy pomocy React.js i jest uruchamiany na **App Service**, Api zostało zaimplementowane na **Azure Functions** w Python3, po stronie backendu wykorzystaliśmy **Cognitive Services: custom vision i text to speech**
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

## Wnioski:
Projekt w swojej podstawowej postaci jest gotowy i działa poprawnie, zastosowanie **App Service** jest dosyć ciekawą alternatywą do klasycznych sposobów deployowania aplikacji, jest ono znacznie szybsze niż w przypadku takich portali jak np: heroku, jednak wymaga większego doświadczenia by w pełni korzystać ze wszystkich jej możliwości.
**Azure Functions** może zastąpić backend aplikacji, użyliśmy go by wypróbować oba rozwiązania, wydaje mi się że pod względem finansów, jest on zdecydowanie bardziej opłacalny jeżeli częśtotliwość rządań nie jest zbyt duża, w przeciwnym wypadku chyba bardziej opłacalne jest napisanie backendu na App Service.
Główną logikę aplikacji wykonuje **Cognitive Services**, **custom vision** do tworzenia opisu zdjęć, natomiast **text to speech** do tworzenia opisów audio. Obydwa serwisy są proste i przyjemne w użytkowniu poprzez ich API.
Nasz projekt jest tylko wstępem do zagadnienia opisu obrazów i można go jeszcze rozwijać w celu dalszego porawiania jego zastosowań. Tego typu rozwiązania mogą być używane w inteligentnych systemach, pojazdach lub przedmiotach użytku codziennego np smart house dla niewidomych, kamera mówi co widzi, inteligentny system słuchawkowy, ktory prowadzi niewidomego.
