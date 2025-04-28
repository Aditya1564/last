$('.numberonly').keypress(function (e) {
    var charCode = (e.which) ? e.which : event.keyCode
    if (String.fromCharCode(charCode).match(/[^0-9]/g))
        return false;
});

function toggleCheckbox(checkbox) {
    if (!checkbox) return;
    
    if (checkbox.id === 'header-toggle') {
        // If header-toggle is checked, check checkbox2
        var element = document.getElementById('header-toggle-2');
        if (element) {
            element.checked = checkbox.checked;
        }
    } else if (checkbox.id === 'header-toggle-2') {
        // If header-toggle-2 is checked, check header-toggle
        var element = document.getElementById('header-toggle');
        if (element) {
            element.checked = checkbox.checked;
        }
    }
}

function lazyLoad(){
    try {
        console.log('hello');
        var u; 
        var v = document.querySelectorAll("img.lazy") || [];
        var s = $(".home-slider-img img.lazy");
        
        // If no lazy-load images are found, exit early
        if (!v || v.length === 0) {
            console.log('No lazy-load images found');
            return;
        }
        
        function r() {
            if (!v || v.length === 0) {
                console.log('No lazy-load images available for scroll event');
                return;
            }
            
            u && clearTimeout(u);
            u = setTimeout(function() {
                var u = window.pageYOffset;
                v.forEach(function(v) {
                    if (v && v.offsetTop !== undefined && v.dataset && v.dataset.src) {
                        v.offsetTop < window.innerHeight + u && (v.src = v.dataset.src,
                        v.classList.remove("lazy"));
                    }
                });
                
                if (v.length === 0) {
                    if (document && document.removeEventListener) {
                        document.removeEventListener("scroll", r);
                    }
                    if (window && window.removeEventListener) {
                        window.removeEventListener("resize", r);
                        window.removeEventListener("orientationChange", r);
                    }
                }
            }, 20);
        }
        
        // Add null check for jQuery objects
        if (s && s.length > 0) {
            s.each(function() {
                var u = $(this).attr("data-src");
                console.log(u);
                if (s && s.length > 0) {
                    $(s).attr("src", '<svg width="249" height="93" viewBox="0 0 249 93" fill="none" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode:multiply" opacity="0.5"><path d="M54.4345 74.2907L50.8104 72.5747C50.8104 70.0961 49.7613 67.8717 48.0922 66.2828C48.7916 64.7892 49.0619 63.0574 48.6963 61.2303C48.0605 58.1001 45.5331 55.5898 42.4017 54.986C40.2399 54.5729 38.2212 55.0336 36.5681 56.0665C34.0407 53.8421 30.7185 52.4755 27.0785 52.4755C20.1163 52.4755 14.3144 57.4169 12.9792 63.9948C8.75105 64.5669 5.47658 68.1735 5.47658 72.5589C5.47658 72.7018 5.47658 72.8449 5.49248 72.9878L1.5981 74.2113C0.262883 74.6244 0.564895 76.6105 1.96369 76.6105H53.91C55.2134 76.6105 55.6267 74.8309 54.4345 74.2748V74.2907Z" fill="#755DE5"/></g><g style="mix-blend-mode:multiply" opacity="0.5"><path d="M248.045 24.9246L239.239 22.7638C237.761 19.3318 234.518 16.8373 230.655 16.4242C230.655 16.4083 230.655 16.3765 230.655 16.3606C230.655 11.7688 226.936 8.05082 222.342 8.05082C221.388 8.05082 220.482 8.22567 219.624 8.51162C218.527 3.80864 214.315 0.29718 209.276 0.29718C203.395 0.29718 198.642 5.06375 198.642 10.9268C198.642 11.022 198.642 11.1174 198.642 11.2286C197.847 11.0379 197.037 10.9268 196.194 10.9268C192.093 10.9268 188.533 13.2623 186.752 16.6625C185.942 16.4719 185.115 16.3606 184.241 16.3606C179.711 16.3606 175.848 19.2046 174.322 23.1928C171.365 23.7965 168.441 24.4002 165.818 24.9246C164.578 25.1788 164.769 26.9902 166.025 26.9902H247.791C249.031 26.9902 249.237 25.2265 248.045 24.9246Z" fill="#755DE5"/></g><path d="M211.705 27.8332H184.667C184.11 27.8332 183.649 27.3722 183.649 26.8159C183.649 26.2596 184.11 25.7986 184.667 25.7986H211.705C212.261 25.7986 212.722 26.2596 212.722 26.8159C212.722 27.3722 212.261 27.8332 211.705 27.8332Z" fill="white"/></svg>');
                    $(window).on("load", function() {
                        setTimeout(function() {
                            $(s).removeClass("lazy");
                            $(s).attr("src", u);
                        }, 2e3);
                    });
                }
            });
        }
        
        // Add null checks before adding event listeners
        if (document && document.addEventListener && typeof r === 'function') {
            document.addEventListener("scroll", r);
        }
        
        if (window && window.addEventListener && typeof r === 'function') {
            window.addEventListener("resize", r);
            window.addEventListener("orientationChange", r);
        }
    } catch (error) {
        console.error("Error in lazyLoad function:", error);
    }
}