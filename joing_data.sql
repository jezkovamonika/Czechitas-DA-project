--step 01 first we used union to connect all the translated tables for example for title we used 

create table "translated-title" as 

select trim("id") as "id", "text" as "translatedText", "source" from "title-split1-translated"  
union 
select trim("id")as "id", "text" as "translatedText", "source" from "title-split2-translated";
