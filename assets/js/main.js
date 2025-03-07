$(document).ready(function () {
    const currentUrlHash = getUrlHash();
    // const defaultTab = $('#myTab li:first button').data("target").split("#")[1];
    const defaultTab = "page-1";
    showTabsonLoad(currentUrlHash);

    $('button[data-toggle="tab"]').on("click", function (evt) {
        const $selectedTab = $(evt.target);
        const selectedTarget = $selectedTab.data("target").substring(1);
        let $subTabs = $('#' + selectedTarget + ' button[data-toggle="tab"]');
        let firstTab = selectedTarget;

        if ($subTabs.length) {
            firstTab = $subTabs.first().data("target").substring(1);
            $('button[data-target="#' + firstTab + '"]').tab("show");
            $subTabs = $('#' + firstTab + ' button[data-toggle="tab"]');

            if ($subTabs.length) {
                firstTab = $subTabs.first().data("target").substring(1);
                $('button[data-target="#' + firstTab + '"]').tab("show");
            }
        }

        loadMobileTabs(firstTab);
        setUrlHash(firstTab);
    });

    $('a.nav-link').click(function () {
        const $this = $(this);
        const tabText = $this.text();
        const selectedTarget = $this.attr('href').substring(1);

        loadDesktopTabs(selectedTarget);
        setUrlHash(selectedTarget);
        $('a.nav-link').removeClass('active');
        $this.addClass('active');
        $("#selectedTab").text(tabText);
        $('#mobileNavDropdown').collapse("hide");
        $('.overlay').removeClass('show');
        $('#selectedTab').removeClass('invisible');
    });

    $('a.goto-tab').click(function() {
        const showtab = $(this).data("showtab");
        showTabsonLoad(showtab);
        setUrlHash(showtab);
        return false;
    })

    function showTabsonLoad(hashValue = '') {
        const currentTab = hashValue != "" ? hashValue : defaultTab;
        loadDesktopTabs(currentTab);
        loadMobileTabs(currentTab);
    }

    function loadDesktopTabs(currentTab) {
        const $selectedTab = $('button[data-target="#' + currentTab + '"]').tab();
        const tabParents = $selectedTab.data("subtabs").split("_");
        tabParents.unshift(currentTab);

        if (tabParents.length) {
            tabParents.forEach((tab) => {
                $('button[data-target="#' + tab + '"]').tab('show');
            });
        }
    }

    function loadMobileTabs(currentTab) {
        const $selectedTab = $('a.nav-link[href="#' + currentTab + '"]');
        const tabParents = $selectedTab.data("subtabs").split("_");
        tabParents.unshift(currentTab);

        if (tabParents.length) {
            tabParents.forEach((tab) => {
                $("#collapseExample-" + tab).collapse('show');
            });
        }

        $('a.nav-link').removeClass('active');
        $selectedTab.addClass('active');
        $('#mobileNavDropdown').collapse("hide");

        const tabText = $('a.nav-link[href="#' + currentTab + '"]').text();
        $("#selectedTab").text(tabText);
    }

    function getUrlHash() {
        return window.location.href.split("#")[1];
    }

    function setUrlHash(urlHash) {
        if (urlHash && urlHash != "")
            history.replaceState(null, "", "#" + urlHash);
        else
            history.replaceState(null, "", window.location.href.split("#")[0]);
    }

    $('.navbar-toggler').click(function () {
        $('#selectedTab').toggleClass('invisible');
        $('.overlay').toggleClass('show');
    });
});