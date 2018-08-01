#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=33bb56b856d7c342a15a34c9d4462537b9928df1 \
    --form "config=@.circleci/config.yml" \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/andela/ET-rc/tree/develop
