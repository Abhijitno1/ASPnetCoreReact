import React, { useState, useRef } from 'react';
import '../css/JSPlayer.css';

export function JavascriptPlayer() {
    const txtWhiteboardRef = useRef();
    const iframeRef = useRef();

    function onBtnRunClick(e) {
        //alert('You clicked ' + e.target.title + ' button');
        var userScript = txtWhiteboardRef.current.value;
        var iframe = iframeRef.current,
            iframedoc = iframe.contentDocument || iframe.contentWindow.document;
        iframedoc.body.innerHTML = userScript;
    }

    function oldFetchCode() {
        var userScript = txtWhiteboardRef.current.value;
        fetch('utility?js=' + userScript)
            .then(response => response.text()) //https://javascript.info/fetch
            .then(data => {
                console.log('Server data', data)
                //var encodedData = encodeURIComponent(data);
                //var uriData = URL.createObjectURL(encodedData);
                //iframeRef.current.setSrc(uriData);
                //https://stackoverflow.com/questions/6102636/html-code-as-iframe-source-rather-than-a-url
                var iframe = iframeRef.current,
                    iframedoc = iframe.contentDocument || iframe.contentWindow.document;
                iframedoc.body.innerHTML = data;
            })
            .catch(function (error) {
                console.error(error);
            });
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
                    <textarea id="txtWhiteboard" name="txtWhiteboard" ref={txtWhiteboardRef}></textarea>
                </div>
                <div className="testresultswrapper withborder">
                    <iframe frameBorder="0" id="iframeResult" name="iframeResult" allowFullScreen={true} ref={iframeRef} />
                </div>
            </div>
        </>
    );
}