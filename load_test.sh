# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!" 
# curl -s "http://fydp-8a3f6.appspot.com?[1-10]" &
# pidlist="$pidlist $!"  

for I in {1..35}
do
	{ time curl -s "http://google.com?[1-100]" 2> sleep.stderr ; } >> test_results.txt 
done