alias la='ls -AlFt'
alias lv='ls -CFt'
alias li='ls -dt .*'

tri(){
trans :en "$1"
}
tre(){
trans :it "$1"
}
trr(){
trans :ro "$1"
}

cas(){
cd ~/.config/autostart/
}

c(){
  which "$1"
}

ci(){
curl https://ipapi.co/json
}

alias r='source ~/.zshrc && hash -r && echo "✅ \
Reloaded shell + refreshed command cache"'

nf() {
  nano ~/.zshrc
}

alias f='firefox &'
alias v='code'

tb(){
tor-browser
}

lsf(){
  localsend
}

ffd(){
  firefox https://localhost/ &
}