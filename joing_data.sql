--step 01 first we used union to connect all the translated tables for example for title we used 

CREATE TABLE "translated-title" AS 

SELECT TRIM("id") as "id"
, "text" AS "translatedText",
"source" FROM "title-split1-translated"  
UNION 
SELECT trim("id") AS "id"
,"text" AS "translatedText"
, "source" FROM "title-split2-translated";

--step 02 we have to make sure that there are no duplicites in the dataset
CREATE OR REPLACE TABLE "translated-title" AS
SELECT
    *
FROM "translated-title"
QUALIFY ROW_NUMBER() OVER (PARTITION BY "id" ORDER BY "id" DESC NULLS LAST) = 1;

-- step 03 we can join the the translated and untranslated data
update "clean_united" set id = trim(id);

CREATE OR REPLACE TABLE "clean_united_translated" AS 

SELECT c."ID", c."ArticleDate", c."ArticleTime", c."ArticleEdited", c."EditDate", c."EditTime", c."Title", c."Perex", c."Text", c."url"
, title."translatedText" AS "translatedTitle", perex."translatedText" AS "translatedPerex", txt."translatedText"
FROM "clean_united" AS c
LEFT JOIN "translated-title" AS title
ON c.id = title."id" 
LEFT JOIN "translated-perex" AS perex
ON c.id = perex."id"
LEFT JOIN "translated-text" AS txt
ON c.id = txt."id";


--step 04 making sure there is no untranslated text (we don't mind untranslated title or perex since we know we have scraped some articles that do not have title or perex)
CREATE TABLE "untranslated" AS
SELECT * FROM "clean_united_translated" WHERE "translatedText" IS null;
