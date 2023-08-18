
    $(document).ready(function () {
        //https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
        $('.date').datepicker({
            //orientation: 'top',
            todayBtn: 'linked',
            autoclose: true
        });

    $('#btnSearchVideo').click(function () {
        $.ajax({
            url: '@Url.Action("SearchVideoDialog", "Home")',
            data: { videoName: $('#txtVideoName').val() },
            type: "GET",
            success: function (response) {
                $("#dlgContainer").html(response);
                $("#dlgSearchVideo").modal()
            },
            error: function (response) {
                $("#dlgContainer").html(response.responseText);
                $("#dlgSearchVideo").modal()
            }
        });
            })

    $('#dlgContainer').on('click', '#btnSrchVidOk', function () {
                var selVideoName = $('#txtSrchVideoName').val();
    $('#txtVideoName').val(selVideoName);
    $("#dlgSearchVideo").modal('hide')
            });

    //https://stackoverflow.com/questions/15625195/jquery-validator-plugin-ajax-submitting-not-working
    $("form").submit(function (e) {
        e.preventDefault();
    $.ajax({
        type: "POST",
    url: '@Url.Action("Search", "Comments")',
    data: $(this).serialize(),
    success: function (data, status, jqXHR) {
        $('#resultItems').html(data);
                            /*.append("<p>someone</p>")
    .hide()
    .fadeIn(1500, function () {
        $('#message').append("<img id='checkmark' src='images/ok.png' />");
                            });*/
                    },
    beforeSend: function (xhr) {
        //showloadingSign();
    },
    complete: function (xhr, status) {
        //hideloadingSign();
    }
                });
    return false;
            });

        });

