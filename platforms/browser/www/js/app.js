
/** 
 * Workaround for the phonon template loader. 
 * On android, the current directory is one level above
 * in the directory structure.
 */
var httpRoot = window.location.toString().split("index.html")[0];
var templateRootDirectory = httpRoot.indexOf("android_asset") !== -1 ? httpRoot + "pages/" : "../pages";

phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: templateRootDirectory
    },
    i18n: null
});


/**
 * 
 * This data should come from a remote server
 * 
 */
var user = {
    email: 'phillip@dornauer.cc',
    nickname: 'phillip.dornauer',
    points: 2000
};

var app = phonon.navigator();

app.on({page: 'home', preventClose: false, content: null}, function(activity){
    
    activity.onReady(function() {
        for( var attr in user ){
            document.querySelector("[data-profile-" + attr + "]").textContent = user[attr];
        }
    });
    
    activity.onCreate(function(){
        document.querySelector("[data-action=external-app]").on("tap", function(){
            /*startApp.set({
                "action": "ACTION_VIEW",
                "uri": "https://github.com/lampaa"
            }).start();*/
                console.log("clicked");
        });
    });
    
});


app.on({page: 'page-profile-edit', content: 'page-profile-edit.html'}, function(activity) {
    
    var $email, $nickname;
    
    activity.onReady(function(self) {
        $email.value = user.email;
        $nickname.value = user.nickname;
    });
    
    activity.onCreate(function(){
        
        $email = document.querySelector("#input-email");
        $nickname = document.querySelector("#input-nickname");
        
        document.querySelector("#action-save").on("tap", function(){
            user.email = $email.value;
            user.nickname = $nickname.value;
            
            app.changePage("home");
        });
    });
    
});

app.start();