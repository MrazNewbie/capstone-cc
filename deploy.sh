GOOGLE_PROJECT_ID=capston-project-388819
CLOUD_RUN_SERVICE=jolly-app-service
INSTANCE_CONNECTION_NAME=capston-project-388819:asia-southeast2:crud-mysql
DB_USER=root
DB_PASS=123
DB_NAME=bucket-list

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
--project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
--image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
--add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
--update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME,DB_USER=$DB_USER \
--platform managed \
--region asia-southeast2 \
--allow-unauthenticated \
--project=$GOOGLE_PROJECT_ID
