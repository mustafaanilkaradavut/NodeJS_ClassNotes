-- Active: 1721871947080@@127.0.0.1@3306
SELECT * FROM Album;
SELECT * FROM "Artist";
SELECT * FROM "Album" as alb INNER JOIN "Artist" as art ON alb."ArtistId" = art."ArtistId";
--* alb ve art kullanarak isim kısaltması yaparız. Kullanım kolaylığı sağlar.

SELECT alb."AlbumId", alb."Title", art."Name" AS "Album Artist" 
    FROM "Album" AS alb INNER JOIN "Artist" as art 
    ON alb."ArtistId" = art."ArtistId";
-- Bu sorgu, "Album" tablosundan albüm kimliği (AlbumId) ve albüm başlığını (Title), "Artist" tablosundan ise sanatçı adını (Name) çekerek, albümlerin sanatçılarıyla eşleştirilmiş listesini döndürür.

SELECT * FROM "Customer";
SELECT * FROM "Invoice";
SELECT c.CustomerId, c.FirstName, c.LastName, i.Total
    FROM Customer AS c
    JOIN Invoice AS i ON c.CustomerId = i.CustomerId;

SELECT * FROM "Album" as a LEFT JOIN "Artist" ar ON a."ArtistId" = ar."ArtistId"; -- Soldaki tabloya göre
SELECT * FROM "Album" as a RIGHT JOIN "Artist" ar ON a."ArtistId" = ar."ArtistId"; -- Sağdaki tabloya göre
SELECT a.AlbumId, ar."Name" as 'Artist Name' 
    FROM "Album" AS a INNER JOIN "Artist" ar 
    ON a."ArtistId" = ar."ArtistId" ORDER BY ar.Name ASC; -- Büyükten küçüğe doğru sıralama yaparız. DESC ile tam tersi.


--! -- -- -- -- -- -- --  FUNCTIONS -- -- -- -- -- -- -- --
--? COUNT -- Kayıt Sayısı
SELECT count(*) AS 'Records' FROM "Album";
SELECT count("AlbumId") FROM "Album";   -- Buradaki kullanım performansa daha uygun çünkü tek bir kolon üzerinden işlem yapar.