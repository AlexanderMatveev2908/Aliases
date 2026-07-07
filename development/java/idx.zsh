jr(){
  # compile and run compiled Java code not jar
  # mvn compile && \
  # java -cp target/classes dev.ninja.App
  
  # compile and run jar
  mvn package -q -Dmaven.test.skip=true && \
  java -jar target/app-1.0-SNAPSHOT.jar
}

jb(){
  idea
}

ji(){
 mvn compile
}