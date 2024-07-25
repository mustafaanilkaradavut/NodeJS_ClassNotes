-- Active: 1721871947080@@127.0.0.1@3306
SELECT * FROM Album;
SELECT * FROM "Artist";
SELECT * FROM "Album" as alb INNER JOIN "Artist" as art ON alb."ArtistId" = art."ArtistId";
--* alb ve art kullanarak isim kısaltması yaparız. Kullanım kolaylığı sağlar.

SELECT alb."AlbumId", alb."Title", art."Name" AS "Album Artist" FROM "Album" AS alb INNER JOIN "Artist" as art ON alb."ArtistId" = art."ArtistId";
-- Bu sorgu, "Album" tablosundan albüm kimliği (AlbumId) ve albüm başlığını (Title), "Artist" tablosundan ise sanatçı adını (Name) çekerek, albümlerin sanatçılarıyla eşleştirilmiş listesini döndürür.



