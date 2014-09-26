package com.RepairSys;

import android.os.Bundle;
import org.apache.cordova.*;

public class HelloWorld extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //loadUrl("file:///android_asset/www/index.html");
		loadUrl("file:///android_asset/www/test2/index.html");
    }
}
