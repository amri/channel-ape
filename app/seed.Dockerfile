FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db nest --collection templatemodels --type json --file /init.json --jsonArray