#!/bin/sh -e
#
# Very simple test suite.
#
# Run:
# 	bin/simple-test.sh
#
# Full Test Suite:
# 	tests/test.sh src/detox
#

DETOX=$(dirname $(dirname $0))/src/detox
DETOXRC=$(dirname $(dirname $0))/etc/detoxrc

if [ ! -x "$DETOX" ] ; then
	echo please complie detox first
	exit 1
fi

echo -n "version: "
$DETOX -V

# -------------------------------------------

# just checking for errors

$DETOX -L -v > /dev/null

# ------------------------------------------

# still just checking for errors

if [ -f "$DETOXRC" ] ; then
	$DETOX -f $DETOXRC -L -v > /dev/null
else
	echo "couldn't find detoxrc"
fi

# -------------------------------------------

INPUT="hi there"
OUTPUT="hi_there"

CHECK=$(echo $INPUT | $DETOX --inline)
if [ "$CHECK" != "$OUTPUT" ] ; then
	echo failed to rename "INPUT" to "$OUTPUT"
	exit 1
fi

# -------------------------------------------

INPUT="hi - - - there"
OUTPUT="hi-there"

CHECK=$(echo $INPUT | $DETOX --inline)
if [ "$CHECK" != "$OUTPUT" ] ; then
	echo failed to rename "INPUT" to "$OUTPUT"
	exit 1
fi

# -------------------------------------------

echo "simple tests passed"
