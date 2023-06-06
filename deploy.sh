source .env

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_REGISTRY_IMAGE \
--project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
--image gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_REGISTRY_IMAGE \
--add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
--update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME \
--platform managed \
--region us-central1 \
--allow-unauthenticated \
--project=$GOOGLE_PROJECT_ID
