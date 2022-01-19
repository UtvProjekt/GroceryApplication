@ECHO OFF
ECHO =============
ECHO SHUTING SOLR DOWN!
ECHO =============

ECHO ==================================
ECHO STOPING SOLR ON PORT: 8983
ECHO ==================================

solr stop -all
