// Wrapper function to provide safety against null element errors
document.addEventListener("DOMContentLoaded", function() {
  // Original alerts object
  alerts = {
    alert: function(type, message){
        if (typeof Swal === 'undefined') {
            console.error('SweetAlert2 is not defined');
            return;
        }
        Swal.fire({
            text: message,
            icon: type,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-primary"
            }
        });
    },
    confirm: function(message, route){
        if (typeof Swal === 'undefined') {
            console.error('SweetAlert2 is not defined');
            return;
        }
        Swal.fire({
            text: message,
            icon: 'warning',
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: 'Nope',
            allowOutsideClick: false,
            closeOnEsc: false,
            customClass: {
                confirmButton: "btn btn-md btn-primary btn-confirmed m-2",
                cancelButton: "btn btn-md btn-danger m-2"
            },
            showLoaderOnConfirm: true,
            preConfirm: () => {
                $btn = $('.btn-confirmed');
                $btn_html = $btn.html();
                    $.ajax({
                        url: route,
                        method: 'DELETE',
                        data: {},
                        dataType: 'json',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        beforeSend: function(){
                            $btn.prop('disabled', true);
                            $btn.html('<span class="indicator-label">Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>');
                        },
                        success: function(json){
                            if(json.redirect){
                                location.href = json.redirect;
                            }
                        },
                        complete: function(){
                            $btn.prop('disabled', false);
                            $btn.html($btn_html);
                        },
                        error: function(response) {
                            Swal.close();
                            if (typeof alerts !== 'undefined') {
                                alerts.alert('error', response.responseJSON.message);
                            }
                        }
                    });
                
                return false;
            }
        });
    }
  };

  // Safe function implementations
  function toast(type, message){
    if (typeof toastr === 'undefined') {
        console.error('toastr is not defined');
        return;
    }
    
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toastr-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if(type == 'success'){
        toastr.success(message);
    }else if(type == 'warning'){
        toastr.warning(message);
    }else if(type == 'error'){
        toastr.error(message);
    }else if(type == 'info'){
        toastr.info(message);
    }
  }

  // The rest of the common JS functions with null checks
  // ...
  
  // Handling dropdown functionality safely - this section has been removed
  // since we're eliminating dropdown functionality
  
  console.log("Common JS loaded with safety checks");
});