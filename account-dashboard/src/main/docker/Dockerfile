#FROM java:8
FROM openjdk:8-jdk-alpine

VOLUME /tmp

RUN mkdir /devcloud/logs -p

COPY ./account-dashboard.jar /devcloud/account-dashboard.jar

ENTRYPOINT [ "sh", "-c", "java -Dlogging.file=/devcloud/logs/account-dashboard.log -jar /devcloud/account-dashboard.jar" ]