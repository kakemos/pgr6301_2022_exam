# PG6301 eksamen 2022

[Heroku](https://cryptic-brushlands-72182.herokuapp.com/)  
[Test rapport](https://github.com/kristiania-pg6301-2022/pgr6301-exam-kakemos/commit/28122c90818259406fb7e48944911f1008d1a3fc)


## Funksjonelle krav

* [x] Anonyme brukere skal se nyhetsaker når de kommer til nettsiden. Legg inn noen nyhetssaker for å demonstrere
* [x] Når en ny sak publiseres, skal alle brukerne få se den nye saken umiddelbart. Bruk websockets for å sende oppdateringer
* [x] Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre mekanismer er også akseptabelt
* [x] En bruker som er logget inn kan se på sin profilside (userinfo fra Google)
* [x] Brukere skal forbli logget inn når de refresher websiden
* [x] En bruker som er logget inn kan klikke på en nyhetssak for å se detaljene om nyhetssaken. Detaljene skal inkludere en nyhetskategori, overskrift, tekst og navn på den som publiserte den
* [x] "Redaksjonelle brukere" kan logge seg inn med Active Directory. Det må fungere å logge seg inn med en Active Directory på skolens AD ( domain_hint=egms.no )
* [x] Redaksjonelle brukere kan publisere nye nyhetsartikler
* [x] Nyhetsartikkel skal inneholde en kategori valgt fra en nedtrekksliste ( <select> ), tittel ( <input> ) og tekst ( <textarea> )
* [x] Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler kategori, tittel eller tekst
* [x] Alle feil fra serves skal presenteres til bruker på en pen måte, med mulighet for brukeren til å prøve igjen
* [ ] Dersom noen allerede har publisert en nyhetsartikkel med samme tittel skal serveren sende HTTP status kode 400 og en feilmelding
  * Jeg prøvde å implimentere dette, men fikk ikke tid til å gjøre det ferdig.
* [ ] En redaksjonell bruker skal kunne redigere en artikkel de selv har publisert
  * Her prøvde jeg å både slette en artikkel og endre den, men rakk ikke gjøre ferdig noen av delene innenfor tiden. Har fortsatt latt Delete Article-siden bli igjen, da man fortsatt får lista ut alle artiklene man selv har skrevet, og som man kunne hatt mulighet til å slette.



## Tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
* [x] React Router
* [x] Express app
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
* [x] Deployment til Heroku
* [x] Bruk av MongoDB
* [x] OpenID Connect
* [x] Web Sockets
* [x] Jest med dokumentert testdekning
  * Testing fra client gitt etterhvert greit nok, mens server-tester fikk jeg ikke til å fungere innenfor tiden. 
 
