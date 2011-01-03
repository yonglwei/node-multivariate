var sys = require('sys'),
    config = require('./config').init()

exports.helper = {
    has_variant:function(key){
        return (key.indexOf('/v/') > -1)
    },
    has_event:function(key){
        return (key.indexOf('/e/') > -1)
    },
    has_step:function(key){
        return (key.indexOf('/step/') > -1)
    },
    is_bucket_test:function(key){
        return (key.indexOf('/b/') > -1)
    },
    is_page_test:function(key){
        return (key.indexOf('/p/') > -1)
    },
    is_funnel_test:function(key){
        return (key.indexOf('/f/') > -1)
    },    
    is_module_test:function(key){
        return (key.indexOf('/m/') > -1)
    },
    datestamp:function(key, epoch){
        return key + '/' + epoch.toString()
    },

    /*
        Adjust and rounds the current date to its minimum value.
    */
    epoch:function(){
        var dt = new Date();
        
        // adjust date to some other timezone other then local system?
        // sys.puts('Server date:')
        // sys.puts(dt.toString())
        var offset = config.app_stats_offset
        if (offset != 0) {
            // adjust via ms so we can also account for a minute offset
            var offset_ms = offset * 3600000
            dt = new Date(dt.getTime() + offset_ms)
            // sys.puts('Adjusted date:')
            // sys.puts(dt.toString())
        }
        // now round down to midnight...
        dt.setHours(0, 0, 0, 0)
        // sys.puts('Redis date:')
        // sys.puts(dt.toString())
        return dt.getTime()
    }
}