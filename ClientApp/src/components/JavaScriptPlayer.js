import React, { useState } from 'react';
import '../css/JSPlayer.css';

export function JavascriptPlayer() {
    function onBtnRunClick(e) {
        alert('You clicked ' + e.target.title + ' button');
    }

    return (
        <>
            <div className="well well-sm" style={{ marginBottom: "2px" }} >
                <button className="btn btn-default" id="btnDownloadSnip" title="Download Snippet">
                    <i className="glyphicon glyphicon-floppy-save"></i>
                </button>
                <button className="btn btn-default" id="btnChangeOrientation" title="Change Orientation">
                    <i className="glyphicon glyphicon-transfer"></i>
                </button>
                <button className="btn btn-default" id="btnChangeTheme" title="Change Theme">
                    <i className="glyphicon glyphicon-text-background"></i>
                </button>
                <button type="button" className="btn btn-success btn-sm" title="Run code snippet"
                    onClick={onBtnRunClick}>Run &gt;</button>
            </div>
            <div className="playground">
                <div className="testresultswrapper">
                    <textarea id="txtWhiteboard" name="txtWhiteboard"></textarea>
                </div>
                <div className="testresultswrapper withborder">
                    <iframe frameborder="0" id="iframeResult" name="iframeResult" allowfullscreen="true" />
                </div>
            </div>
        </>
    );
}