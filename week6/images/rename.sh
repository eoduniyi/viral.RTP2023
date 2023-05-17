#!/bin/bash

count=0
for img in *.jpg
do
  mv -- "$img" "image$count.jpg"
  ((count++))
done
