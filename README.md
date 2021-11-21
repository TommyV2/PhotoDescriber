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

1. Wszystko zaczyna się od otworzenia aplikacji klienta, to właśnie ona jest interfejsem użytkownika do wgrywania i odtwarzania zdjęć.


