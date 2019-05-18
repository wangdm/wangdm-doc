#FROM java:8
FROM openjdk:8-jdk-alpine

VOLUME /tmp

RUN mkdir /devcloud/logs -p

COPY ./admin-dashboard.jar /devcloud/admin-dashboard.jar

ENTRYPOINT [ "sh", "-c", "java -Dlogging.file=/devcloud/logs/admin-dashboard.log -jar /devcloud/admin-dashboard.jar" ]