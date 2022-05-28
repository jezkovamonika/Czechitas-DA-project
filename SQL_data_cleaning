
--step 01
CREATE OR REPLACE TABLE "kveten_02_clean" AS

SELECT 
   SPLIT("pageDate", ' ')[0]:: TIME AS "ArticleTime"
  ,SPLIT("pageDate", ' ')[1] AS "ArticleDate" 
  ,SPLIT("pageDate", ' ')[2] AS "Edit"
  ,SPLIT("pageDate", ' ')[3]:: TIME AS "EditTime"
  ,SPLIT("pageDate", ' ')[4] AS "EditDate"
  ,"pageTitle" AS "Title"
  ,"pageOpener" AS "Perex"
  ,"fullText" AS "Text"
  ,"url"

FROM 
"kveten02_dirty"
where "url"  ilike '%ria.ru%';

--step02
CREATE OR REPLACE TABLE "kveten_02_clean"AS

SELECT
     "ArticleDate"
    ,"ArticleTime"
    ,SUBSTRING("Edit",2,8) AS "Edited"
    ,SUBSTRING("EditDate",2,9) AS "EditDate"
    ,"EditTime"
    ,"Title"
    ,"Perex"
    ,"Text"
    ,"url"    

FROM "kveten_02_clean";

--step 03
CREATE OR REPLACE TABLE "kveten_02_clean" AS

SELECT
     SPLIT("ArticleDate", '.')[0] AS ARTDAY
     ,SPLIT("ArticleDate", '.')[1] AS ARTMONTH
     ,SPLIT("ArticleDate", '.')[2] AS ARTYEAR
    ,"ArticleTime"
    ,"Edited"
    ,CASE
        WHEN "Edited" ILIKE 'обновлен' THEN 'Yes'
        ELSE NULL
     END AS "ArticleEdited"
    ,SPLIT("EditDate", '.')[0] AS EDITDAY
    ,SPLIT("EditDate", '.')[1] AS EDITMONTH
    ,SPLIT("EditDate", '.')[2] AS EDITYEAR
    ,"EditTime"
    ,"Title"
    ,"Perex"
    ,"Text"
    ,"url"    

FROM "kveten_02_clean";


--step04
CREATE OR REPLACE TABLE "kveten_02_clean" AS

SELECT 
    DATE_FROM_PARTS(ARTYEAR, ARTMONTH, ARTDAY) AS "ArticleDate"
   ,"ArticleTime"
   ,"ArticleEdited"
   ,DATE_FROM_PARTS(EDITYEAR, EDITMONTH, EDITDAY) AS "EditDate"
   ,"EditTime"
   ,"Title"
   ,"Perex"
   ,"Text"
   ,"url"
       
FROM "kveten_02_clean"
;


--step 05
CREATE OR REPLACE TABLE "kveten_02_clean" AS

SELECT 
   "ArticleDate"
   ,"ArticleTime"
   ,"ArticleEdited"
   ,"EditDate"
   ,"EditTime"
   ,"Title"
   ,"Perex"
   ,"Text"
   ,"url"
   ,REPLACE("url",'https://',' ') AS URL_NEW
   ,REPLACE (URL_NEW, '.html', ' ') as "ID"
   
   
FROM "kveten_02_clean"
WHERE "ArticleDate" BETWEEN '2022-05-16' AND '2022-05-22'
;


--step 06
CREATE OR REPLACE TABLE "kveten_02_clean" AS
 
SELECT
    "ID"
    ,"ArticleDate"
   ,"ArticleTime"
   ,"ArticleEdited"
   ,"EditDate"
   ,"EditTime"
   ,"Title"
   ,"Perex"
   ,"Text"
   ,"url"

FROM "kveten_02_clean";


--step 07
create or replace table "clean_united" as 

select * from "unor_01_clean"  
union
select * from "unor_02_clean" 
union
select * from "unor_03_clean"
union
select * from "unor_04_clean" 
union
select * from "unor_Gapfill_clean"
union
select * from "brezen_01_clean"
union
select * from "brezen_rest_clean"
union
select * from "brezen_Gapfill_clean"
union
select * from "duben_clean"
union
select * from "listopad_clean"
union
select * from "prosinec_clean"
union
select * from "leden_clean"
union
select * from "kveten_01_clean"
union
select * from "kveten_02_clean"
;

alter table "clean_united" add "source" varchar(350)
;

update "clean_united" set id = trim(id); --to get rid of white spaces in ID which would  prevent us form joining the data

update "clean_united" set "source" = 'ru'; -- in the first phase we used the google translate component in Keboola and for that we had to create a separate column with the source language

-- step 08 creating tables containing all titles, perexes and texts for translation
create table "clean_title" as 

select "ID" as "id", "Title" as "text", "source" from "clean_united"
