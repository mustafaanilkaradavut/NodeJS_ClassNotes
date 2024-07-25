-- Active: 1721880906665@@127.0.0.1@5432@test_db
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

--? SUM -- Toplam
SELECT * FROM Invoice;
SELECT sum(Total) FROM "Invoice";
SELECT * FROM Invoice WHERE BillingCountry IN ('USA', 'Canada');

--? AVG -- Ortalama
SELECT avg(Total) FROM "Invoice";

--? MIN -- Minumum Değer
SELECT min(Total) FROM "Invoice";

--? MAX -- Maximum Değer
SELECT max(Total) FROM "Invoice";

--? ROUND -- Yuvarlama
SELECT round(avg(Total),2) FROM "Invoice";

--? LENGTH -- Karakter Sayısı (Kayıt sayısını tek satıra düşürmez. Her kaydın karakter sayısını aynı satıra yazar.)
SELECT Title, length(Title) FROM Album;


--------------! POSTGRES SQL !-------------

SELECT * FROM Album;
SELECT Title, length(Title) FROM Album;
SELECT * FROM Invoice;

--* USA'daki toplam fatura tutarı : 
SELECT * FROM Invoice WHERE BillingCountry = 'USA';
SELECT DISTINCT (BillingCountry) FROM Invoice;
SELECT BillingCountry, count(InvoiceId) FROM Invoice GROUP BY BillingCountry;
SELECT BillingCountry, 
	    COUNT(InvoiceId) AS faturaSayisi, 
	    SUM(Total) AS toplam, 
	    MIN(Total) AS minimum, 
	    MAX(Total) AS maximum,
	    ROUND(AVG(Total), 2) AS ortalama
    FROM Invoice
    GROUP BY BillingCountry;

SELECT Country, count(Country) AS "CountryCount"
    FROM Customer
    GROUP BY Country
    HAVING count(Country) > 1;

------------------------? CRUD ?--------------------------------
--* insert --yeni kayıt >   Create
--* select --sorgu >        Read
--* update --güncelleme >   Update
--* delete --silme >        Ddelete

SELECT * FROM Genre;
INSERT INTO Genre (GenreId, Name) VALUES (26, 'Halk Müziği'); -- Veriler 25 tane olduğu 25'te bittiği için 26 deriz.
INSERT INTO Genre (GenreId, Name) VALUES(29, 'Türk Halk Müziği >'),(30, 'Pop Müziği >');
INSERT INTO Genre (genreid,name) VALUES(27,'Turk Halk Muzigi'),(28,'Pop Muzigi');

--Tehlikeli Komutlar (Delete, Update)
UPDATE Genre SET Name = 'Türk Pop Müziği' WHERE GenreId = 30;
DELETE FROM Genre WHERE GenreId = 29;
UPDATE Track SET milliseconds = 0;
DELETE FROM Genre;
SELECT * FROM Track;