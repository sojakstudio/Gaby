filename=$1

echo "새 파일: $filename 을 생성합니다.\n"

cp "src/Assets/Templates/Template.ts" "src/Assets/Commands/$filename.ts"

echo "생성 완료."