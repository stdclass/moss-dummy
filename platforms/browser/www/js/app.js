phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: '../pages'
    },
    i18n: null
});


/**
 * 
 * This data should come form a remote server
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
    
});


app.on({page: 'page-profile-edit', content: 'page-profile-edit.html'}, function(activity) {
    
    var $email, $nickname;
    
    activity.onReady(function(self) {
        $email.value = user.email;
        $nickname.value = user.nickname;
    });
    
    activity.onCreate(function(){console.log(app);
        
        $email = document.querySelector("#input-email");
        $nickname = document.querySelector("#input-nickname");
        
        document.querySelector("#action-save").on("tap", function(){
            user.email = $email.value;
            user.nickname = $nickname.value;
            
            app.changePage("home");
        });
    });
    
});

/*
app.on({page: 'pagetwo', preventClose: true, content: 'pagetwo.html', readyDelay: 1}, function(activity) {

    var action = null;

    var onAction = function(evt) {
        var target = evt.target;
        action = 'ok';

        if(target.getAttribute('data-order') === 'order') {
            phonon.alert('Thank you for your order!', 'Dear customer');

        } else {
            phonon.alert('Your order has been canceled.', 'Dear customer');
        }
    };

    activity.onCreate(function() {
        document.querySelector('.order').on('tap', onAction);
        document.querySelector('.cancel').on('tap', onAction);
    });

    activity.onClose(function(self) {
        if(action !== null) {
            self.close();
        } else {
            phonon.alert('Before leaving this page, you must perform an action.', 'Action required');
        }
    });

    activity.onHidden(function() {
        action = null;
    });

    activity.onHashChanged(function(pizza) {
        document.querySelector('.pizza').textContent = pizza;
    });
});*/

app.start();