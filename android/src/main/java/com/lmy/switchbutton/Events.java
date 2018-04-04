package com.lmy.switchbutton;

/**
 * Created by lmy2534290808 on 2017/12/2.
 */

public enum Events {
    SWITCH_BUTTON_CHANGE("onSwitchButtonChange");

    private final String mName;

    Events(final String name) {
        mName = name;
    }

    @Override
    public String toString() {
        return mName;
    }
}
