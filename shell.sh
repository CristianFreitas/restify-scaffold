#!/bin/bash
APPNAME="restify-scaffold"
PORT="3000" 
echo $1 $2

run() {
    echo "docker run -it \
        $cond \
        --name=$APPNAME \
        -p $PORT:$PORT \
        -d \
        --restart=unless-stopped $APPNAME"
}

if [ $1 == "local" ]
  then

    cond="--net='host'"

    if [ $2 == "deploy" ]
      then
        docker build -t $APPNAME .
        docker stop $APPNAME
        docker rm $APPNAME
        eval $(run)
    fi

    if [ $2 == "stop" ]
      then
        docker stop $APPNAME
    fi

    if [ $2 == "exec" ]
      then
        docker exec -it $APPNAME $3
    fi

    if [ $2 == "start" ]
      then
        docker start $APPNAME
    fi

    if [ $2 == "logs" ]
      then
        docker logs -f $APPNAME
    fi

    if [ $2 == "open" ]
      then
        docker exec -it $APPNAME /bin/sh
    fi
fi