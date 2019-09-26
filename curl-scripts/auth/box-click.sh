curl "https://tic-tac-toe-wdi-production.herokuapp.com/box-click" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "boxes": {
      "index": "'"${INDEX}"'",
    }
  }'

echo
