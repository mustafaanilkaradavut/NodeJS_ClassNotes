-- SQL 2
-- DML bizim en çok kullandığımız metottur. _____ DML CRUD
-- DQL ____ R (SAFE, veride herhangi bir değişiklik yapmaz.)

/*
SELECT *
FROM tableName; BNF Form
*/

-- SELECT I.BillingCity FROM Invoice I;

SELECT * FROM Invoice;
SELECT DISTINCT BillingCountry FROM Invoice; -- Tekrar eden kayıtların gelmesini önler.  
SELECT DISTINCT BillingCountry, BillingCity FROM Invoice; -- İki field girersek ikisini bir olarak değerlendirir.

-- WHERE ŞARTI _____________    =, >, <, !=, <>, <=, >=, BETWEEN, LIKE, AND, OR, NOT, NOT IN

-- SELECT * FROM table WHERE Koşul / Koşullar
SELECT *
FROM Invoice
WHERE BillingCountry='Germany';

-- Fatura miktarı 5'den büyük olanlar
SELECT *
FROM Invoice
WHERE total>=5;

-- Fatura miktarı 5-8 arası büyük olanlar
SELECT *
FROM Invoice
WHERE total >=5 AND total <=8;

SELECT *
FROM Invoice
WHERE total BETWEEN 5 AND 7.96;

SELECT * FROM Invoice WHERE  InvoiceDate BETWEEN ('2010.08.08') AND ('2011.08.16');

SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE 'Germany';

-- Sadece Fatura ülkesi "G" ile başlayanlar :
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE 'G%';

-- Sonu "Y" ile biten ülkere kesilen faturalar : 
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE '%Y';

--  İçinde "W" olan ülkere kesilen faturalar : 
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE '%w%';

-- Sonu "Y" ile biten ülkere kesilen faturalar : 
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE '%Y';

-- "_" bir karakter görevi görür. İlk karakter önemli değil ikinci karakteri "o" olan ülkeler : 
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE '_o%';

-- Üçüncü harfi "r" son harfi "y" : 
SELECT * 
FROM Invoice 
WHERE  BillingCountry LIKE '__r%y';

-- Ülkesi Norway ve Swede olmayan ülkelere kesilen faturalar :
SELECT * 
FROM Invoice 
WHERE  BillingCountry NOT IN ('Norway', 'Swede');

-- LIMIT
SELECT * 
FROM Invoice  LIMIT 10;

-- ORDER BY ASC (ARTAN),    DESC (AZALAN)           default ASC.
SELECT * 
FROM Invoice ORDER BY BillingCountry ASC;

SELECT * 
FROM Invoice ORDER BY BillingCountry DESC;

-- Ülke ismine göre artan şehire göre  azalan :
SELECT BillingCountry,BillingCity
FROM Invoice ORDER BY BillingCountry , BillingCity DESC;

-- Examples
-- track tablosundan AC/DC grubunun ilk 5 parçasını getiriniz.
SELECT *
FROM   Track WHERE Composer ='AC/DC' LIMIT 5;

SELECT *
FROM   Track WHERE Composer ='AC/DC' ORDER BY TrackId DESC LIMIT 3; -- Son üç şarkısını getirmek için.

-- FUNCTIONS   SELECT min, max, avg, sum,round FROM               ( Fonksiyonlar tek bir değer döndürür )

-- Tüm Faturalar :
SELECT * from Invoice;

--Toplam Fatura Miktarı:
SELECT SUM(total) toplamFaturaMiktarı from Invoice;

-- En Düşük, En Yüksek ve Ortalama Fatura Miktarını Getiriniz.
SELECT ROUND (MIN(total)) minFatura, ROUND (MAX(total))  maxFatura, ROUND (AVG(total), 2)  avgFatura FROM Invoice;

SELECT length( BillingAddress) FROM Invoice;

-- AC/DC Grubunun en kısa ve en uzun süreli parçaları :

SELECT min (Milliseconds), max(Milliseconds)  FROM track WHERE Composer='AC/DC';

-- birden fazla fonksiyonda gelen diğer field lara dikkat
SELECT max(Milliseconds), min(Milliseconds),* FROM track 
WHERE composer='AC/DC';

-- GROUP BY

-- Fatura kesilen ülkeye göre grupla:
SELECT * FROM Invoice GROUP by BillingCountry;

-- Her bir ülke için kesilen ortalama fatura miktarı:
SELECT BillingCountry,avg(total) FROM Invoice GROUP by BillingCountry;

--SUBQUERY

-- Ortalama Fatura Miktarı : 6.0
SELECT round (avg(total)) FROM Invoice;

-- Ortalama Fatura Miktarından Yüksek kesilen Faturalar:
SELECT*FROM Invoice where total>6.0;
SELECT*FROM Invoice where total>(SELECT round (avg(total)) FROM Invoice);

/* Big Ones Albumünün Parçaları:
İlk önce "big ones" albümünün bilgilerini bul
içinden albüm id'sini al
track tablosunda albüm id'si yukarıda elde ettiğimiz id olanları listele.
*/

SELECT * FROM Album WHERE Title='Big Ones';
SELECT AlbumId FROM Album WHERE Title='Big Ones';
SELECT * FROM Track WHERE AlbumId=(SELECT AlbumId FROM Album WHERE Title='Big Ones');

-- Mark Phlips'e kesilen tüm faturalar :

SELECT CustomerId from Customer WHERE (FirstName='Mark' and LastName='Philips'); -- Önce ilgili kişinin id'sini buluruz.
SELECT * FROM Invoice where CustomerId = (SELECT CustomerId from Customer WHERE FirstName='Mark' and LastName='Philips'); -- Daha sonra faturalarını getiririz.

-- JOIN

-- Her bir albüm ve albümün ait olduğu artist bilgileri :

SELECT * FROM Album LEFT JOIN Artist on Album.ArtistId=Artist.ArtistId;
SELECT * FROM Artist  JOIN Album on Album.ArtistId=Artist.ArtistId;



