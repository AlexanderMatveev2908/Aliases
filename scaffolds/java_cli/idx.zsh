jc(){
  # mvn archetype:generate \
  # -DgroupId=dev.ninja \
  # -DartifactId=app \
  # -DarchetypeGroupId=org.apache.maven.archetypes \
  # -DarchetypeArtifactId=maven-archetype-quickstart \
  # -DarchetypeVersion=1.5 \
  # -DinteractiveMode=false

  mkdir app && cd app
  cp -r /home/ninja/.config/zsh/aliases/scaffolds/java_cli/data/* ./
}