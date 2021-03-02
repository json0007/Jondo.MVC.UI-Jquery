
(function ($) {

    var jondoGridFunctions = {

        init: function (settings) {
            this.data("jondoGrid", new jondoGrid(settings));
        }
    };

  
    $.fn.jondoGrid = function (methodOrOptions) {
        if (jondoGridFunctions[methodOrOptions]) {
            return jondoGridFunctions[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
            return jondoGridFunctions.init.apply(this, arguments);
        } else {
            $.error("Method " + methodOrOptions + " does not exist");
        }
    };

})(jQuery);

function jondoGrid(settings) {

    var settings = settings;
    settings.filters = {};
    settings.components = {};
    buildGridNew(settings);
    settings.components.jondoGrid = this;
    settings.components.grid = document.getElementById(settings.id);
    settings.components.table = settings.components.grid.getElementsByTagName("table")[1];
    settings.components.body = settings.components.grid.getElementsByTagName("tbody")[0];
    settings.components.footer = settings.components.grid.getElementsByClassName("j-grid-footer")[0];
  
    this.dataSource = {};
    this.dataSource.data = {};
    this.dataSource.read = function (routeData) {
        let requestData, url;
        url = createUrl();
        requestData = buildRequest();
        $.extend(requestData, routeData);

        $.get(url, requestData
            ).then(result => {
                settings.components.jondoGrid.dataSource.set(result.data, result.total);
            })

        function createUrl() {
            return settings.dataSource.action.controller + "/" + settings.dataSource.action.method
        }

        function buildRequest() {

            let data = { Page: settings.paging.curPage, PageSize: settings.paging.curSize, Sort: settings.sort, Filters: settings.filters };
            return { jGridDataSourceRequest: JSON.stringify(data) };
        }
    }
    this.dataSource.set = function (data, total) {
        let body = document.createElement("tbody");
        for (let i = 0; i < data.length; i++) {
       
            let uid = createUid();
            let row = document.createElement("tr");
            row.setAttribute("data-uid", uid)
            data[i].uid = uid;
            
            for (let j = 0; j < settings.columns.length; j++) {
                let cell = document.createElement("td")
                let key = Object.keys(data[i]).find(key => key.toLowerCase() === settings.columns[j].propertyName.toLowerCase())
                cell.innerHTML = data[i][key];
                row.appendChild(cell);
            }
            body.appendChild(row);
        };
        settings.components.jondoGrid.dataSource.data = data;
        settings.components.table.replaceChild(body, settings.components.body);
        settings.components.body = body;

        updateRecordTotals(total ? total : data.length);

        if (settings.paging)
            updatePager(total ? total : data.length);

        if (settings.dataSource.events["change"])
            window[settings.dataSource.events["change"]]();
        
        function updateRecordTotals(total) {
            var span = settings.components.grid.getElementsByClassName("j-grid-total")[0]
            span.innerHTML = "<label>Total Records: </label>" + total;
        }

        function updatePager(total) {
            let pageCount = Math.ceil((total / settings.paging.curSize));
            updatePagerRange(pageCount);
            var pager = settings.components.footer.getElementsByClassName("j-pager")[0];
            settings.components.footer.replaceChild(createPager(pageCount), pager);
        }

        function updatePagerRange(pageCount) {

            if (settings.paging.curPage == 1) {
                settings.paging.curRange[0] = 1;
                settings.paging.curRange[1] = pageCount < 10 ? pageCount : 10
            }

            else if (settings.paging.curPage >= pageCount) {

                let mod = pageCount % 10;
                let diff = pageCount - (mod == 0 ? 9 : mod); 

                settings.paging.curPage = pageCount
                settings.paging.curRange[0] = diff > 0 ? diff : 1

                settings.paging.curRange[1] = pageCount
            }


            else if (settings.paging.curPage > settings.paging.curRange[1]) {
                if (settings.paging.curPage + 10 >= pageCount) {
                    let diff = pageCount % 10;
                    settings.paging.curRange[0] = pageCount - (diff == 0 ? 9 : diff);
                    settings.paging.curRange[1] = pageCount
                }
                else {
                    settings.paging.curRange[0] = settings.paging.curPage;
                    settings.paging.curRange[1] = pageCount > settings.paging.curPage + 9 ? settings.paging.curPage + 9 : pageCount;
                }
            }


            else if (settings.paging.curPage < settings.paging.curRange[0]) {
                settings.paging.curRange[1] = settings.paging.curPage;
                settings.paging.curRange[0] = 1 < settings.paging.curPage - 9 ? settings.paging.curPage - 9 : 1;
            }

          
        }

        function createPager(pageCount) {

            var pager = document.createElement("span");
            pager.className = "j-pager";

            var first = document.createElement("a");
            first.className = "j-pager-item jf-icon jf-fast-backward btn btn-sm btn-light";

            var prev = document.createElement("a");
            prev.className = "j-pager-item jf-icon jf-backward btn btn-sm btn-light";

            if (settings.paging.curPage > 1) {
                first.addEventListener("click", () => {
                    settings.paging.curPage = 1
                    settings.components.jondoGrid.dataSource.read();
                });
                prev.addEventListener("click", () => {
                    settings.paging.curPage -= 1;
                    settings.components.jondoGrid.dataSource.read();
                });
            }
            else {
                first.classList.add("j-state-disabled");
                prev.classList.add("j-state-disabled");
            }

            pager.appendChild(first);
            pager.appendChild(prev);

            for (var i = settings.paging.curRange[0]; i <= settings.paging.curRange[1]; i++) {
                var link = document.createElement("a");
                link.innerHTML = i;
                $(link).data("value", i);
                link.className = "j-pager-item btn btn-sm btn-light";

                if (i === settings.paging.curPage) {
                    link.classList.add("selected");
                }

                link.addEventListener("click", (e) => {
                    settings.paging.curPage = parseInt($(e.currentTarget).data("value"));
                    settings.components.jondoGrid.dataSource.read();
                })

                pager.appendChild(link);
            }

            var next = document.createElement("a");
            next.className = "j-pager-item jf-icon jf-forward btn btn-sm btn-light";

            var last = document.createElement("a");
            last.className = "j-pager-item jf-icon jf-fast-forward btn btn-sm btn-light";

            if (settings.paging.curPage < pageCount) {
                last.addEventListener("click", (e) => {
                    settings.paging.curPage = pageCount
                    settings.components.jondoGrid.dataSource.read();
                });

                next.addEventListener("click", (e) => {
                    settings.paging.curPage += 1;
                    settings.components.jondoGrid.dataSource.read();
                });
            }
            else {
                next.classList.add("j-state-disabled");
                last.classList.add("j-state-disabled");
            }

            pager.appendChild(next);
            pager.appendChild(last);

            return pager;
        }
    }
    this.dataSource.getByUid = function (uid) {
        return settings.jondoGrid.dataSource.data.find(d => d.uid === uid);
    }

    if (settings.resizable)
        enableGridResizing(settings);
    if (settings.sortable)
        enableSorting(settings);
    if (settings.paging)
        enablePaging(settings);
    if (settings.filterable)
        enableFiltering(settings);
    if (settings.dataSource.autoBind)
        this.dataSource.read();

    function buildGrid(settings) {

        var grid = document.getElementById(settings.id);
        grid.classList.add("j-grid");

        var body = document.createElement("div");
        var table = document.createElement("table");
        var header = document.createElement("thead");
        var row = document.createElement("tr");
        var footer = document.createElement("div")

        body.className = "j-grid-body";
        footer.className = "j-grid-footer";

        for (var i = 0; i < settings.columns.length; i++) {
            var cell = document.createElement("th");
            var a = document.createElement("a");
            a.className = ("j-header-text");
            a.innerHTML = settings.columns[i].displayName;
            cell.setAttribute("data-property", settings.columns[i].propertyName);
            cell.appendChild(a);
            row.appendChild(cell);
        }

        header.appendChild(row);
        table.appendChild(header);
        table.appendChild(document.createElement("tbody"));

        body.appendChild(table);

        footer.appendChild($("<span class='j-grid-total'></span>")[0]);

        grid.appendChild(body);
        grid.appendChild(footer);

    }

    function buildGridNew(settings) {

        let grid, header, body, footer;

        grid = document.getElementById(settings.id);

        header = createHeader(settings);
        body = createBody(settings);
        footer = createFooter(settings);

        grid.classList.add("j-grid");
        grid.appendChild(header);
        grid.appendChild(body);

        grid.appendChild(footer);

        function createHeader(settings) {
            let header, table, thead, row, colgroup, toe;

            header = document.createElement("div");
            headerWrap = document.createElement("div");
            table = document.createElement("table");
            thead = document.createElement("thead")
            row = document.createElement("tr")
            colgroup = document.createElement("colgroup");
            toe = document.createElement("div");

            header.className = "j-grid-header";
            headerWrap.className = "j-grid-header-wrap";
            toe.className = "j-grid-header-wrap-toe"


            for (let i = 0; i < settings.columns.length; i++) {

                let col = document.createElement("col");
                colgroup.appendChild(col);
                let cell = document.createElement("th");
                let a = document.createElement("a");
                a.className = ("j-header-text");
                a.innerHTML = settings.columns[i].displayName;
                cell.setAttribute("data-property", settings.columns[i].propertyName);
                cell.appendChild(a);
                row.appendChild(cell);
            }

            thead.appendChild(row);
            table.appendChild(colgroup);
            table.appendChild(thead);
            header.appendChild(table);
            headerWrap.appendChild(header);
            headerWrap.appendChild(toe);

            return headerWrap;
        }

        function createBody(settings) {
            let body, table, tbody, colgroup;

            body = document.createElement("div");
            table = document.createElement("table");
            tbody = document.createElement("tbody");
            colgroup = document.createElement("colgroup");

            body.className = "j-grid-body";

            for (let i = 0; i < settings.columns.length; i++) {
                let col = document.createElement("col");
                colgroup.appendChild(col);
            }

            if (settings.scrollable)
                body.style = "height:" + settings.height;

            table.appendChild(colgroup);
            table.appendChild(tbody);

            body.appendChild(table);

            return body;
        }

        function createFooter(settings) {
            let footer, total;

            footer = document.createElement("div");
            total = document.createElement("span");
            footer.className = "j-grid-footer";
            total.className = "j-grid-total";
            footer.appendChild(total);
            return footer;
        }
    }

  

    //function enableGridResizing(settings) {
     
    //    var row = settings.components.table.getElementsByTagName("tr")[0];
    //    columns = row ? row.children : undefined;
    //    if (!columns)
    //        return;

    //    for (var i = 0; i < columns.length; i++) {
    //        var seperator = createDiv();
    //        columns[i].appendChild(seperator);
    //        setListeners(seperator);
    //    }

    //    function setListeners(seperator) {
    //        var pageX, curCol, curColWidth, table, tableWidth, curSeperator, dragging = false;

    //        seperator.addEventListener('mousedown', function (e) {
    //            e.stopPropagation();
    //            dragging = true;
    //            curSeperator = e.target;
    //            curCol = e.target.parentElement;
    //            table = e.target.closest("table");
    //            pageX = e.pageX;

    //            var padding = paddingDiff(curCol);

    //            curColWidth = curCol.offsetWidth - padding;
    //            tableWidth = table.offsetWidth;
    //        });

    //        seperator.addEventListener('mouseover', function (e) {
    //            e.target.style.borderRight = '2px solid #0000ff';
    //        })

    //        seperator.addEventListener('mouseout', function (e) {
    //            if (!dragging)
    //                e.target.style.borderRight = '';
    //        })

    //        document.addEventListener('mousemove', function (e) {
    //            if (curCol) {
    //                var diffX = e.pageX - pageX;
    //                if (curColWidth + diffX <= 5)
    //                    return;
    //                table.style.width = (tableWidth + (diffX)) + 'px';
    //                curCol.style.width = (curColWidth + diffX) + 'px';
    //            }
    //        });

    //        document.addEventListener('mouseup', function (e) {
    //            dragging = false;
    //            if (curSeperator)
    //                curSeperator.style.borderRight = '';
    //            curCol = undefined;
    //            nxtCol = undefined;
    //            pageX = undefined;
    //            nxtColWidth = undefined;
    //            curColWidth = undefined;
    //            table = undefined;
    //            curSeperator = undefined;
    //        });
    //    }

    //    function createDiv() {
    //        var div = document.createElement('div');
    //        div.className = "col-seperator"
    //        return div;
    //    }

    //    function paddingDiff(col) {

    //        if (getStyleVal(col, 'box-sizing') == 'border-box') {
    //            return 0;
    //        }

    //        var padLeft = getStyleVal(col, 'padding-left');
    //        var padRight = getStyleVal(col, 'padding-right');
    //        return (parseInt(padLeft) + parseInt(padRight));

    //    }

    //    function getStyleVal(elm, css) {
    //        return (window.getComputedStyle(elm, null).getPropertyValue(css))
    //    }
    //};


    function enableGridResizing(settings) {

        let header, row;

        header = settings.components.grid.getElementsByClassName("j-grid-header")[0];
        body = settings.components.grid.getElementsByClassName("j-grid-body")[0];
        row = header.getElementsByTagName("tr")[0];

        body.addEventListener('scroll', function (e) {
            header.scrollLeft = body.scrollLeft;
        });

        columns = row ? row.children : undefined;

        if (!columns)
            return;

        for (let i = 0; i < columns.length; i++) {
            let seperator = createDiv();
            columns[i].appendChild(seperator);
            setListeners(seperator, settings);
        }

        function setListeners(seperator, settings) {
            let pageX, curCol, curColWidth, tableHeader, tableBody, headerColumns, tableWidth, curSeperator, curIndex, colsHeader, colsBody, dragging = false;

            tableHeader = settings.components.grid.getElementsByClassName("j-grid-header")[0].getElementsByTagName("table")[0];
            tableBody = settings.components.grid.getElementsByClassName("j-grid-body")[0].getElementsByTagName("table")[0];
            colsHeader = tableHeader.getElementsByTagName("col");
            colsBody = tableBody.getElementsByTagName("col");
            headerColumns = tableHeader.getElementsByTagName("th");

            seperator.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                dragging = true;
                curSeperator = e.target;
                curCol = e.target.parentElement;
                curIndex = [].slice.call(headerColumns).indexOf(curCol);
                pageX = e.pageX;
                var padding = paddingDiff(curCol);
                curColWidth = curCol.offsetWidth - padding;
                tableWidth = tableHeader.offsetWidth;
            });

            seperator.addEventListener('mouseover', function (e) {
                e.target.style.borderRight = '2px solid #0000ff';
            })

            seperator.addEventListener('mouseout', function (e) {
                if (!dragging)
                    e.target.style.borderRight = '';
            })

            document.addEventListener('mousemove', function (e) {
                if (curCol) {
                    var diffX = e.pageX - pageX;
                    if (curColWidth + diffX <= 5)
                        return;
                    tableHeader.style.width = (tableWidth + (diffX)) + 'px';
                    tableBody.style.width = (tableWidth + (diffX)) + 'px';
                    colsHeader[curIndex].style.width = (curColWidth + diffX) + 'px';
                    colsBody[curIndex].style.width = (curColWidth + diffX) + 'px';
                }
            });

            document.addEventListener('mouseup', function (e) {
                dragging = false;
                if (curSeperator)
                    curSeperator.style.borderRight = '';
                curCol = undefined;
                nxtCol = undefined;
                pageX = undefined;
                nxtColWidth = undefined;
                curColWidth = undefined;
                table = undefined;
                curSeperator = undefined;
            });
        }

        function createDiv() {
            var div = document.createElement('div');
            div.className = "col-seperator"
            return div;
        }

        function paddingDiff(col) {

            if (getStyleVal(col, 'box-sizing') == 'border-box') {
                return 0;
            }

            var padLeft = getStyleVal(col, 'padding-left');
            var padRight = getStyleVal(col, 'padding-right');
            return (parseInt(padLeft) + parseInt(padRight));

        }

        function getStyleVal(elm, css) {
            return (window.getComputedStyle(elm, null).getPropertyValue(css))
        }
    };

    function enablePaging(settings) {
        settings.paging.curPage = 1;
        settings.paging.curRange = [1, 10];
        settings.paging.curSize = settings.paging.defaultSize;

        let pageSize = document.createElement("span");

        pageSize.innerHTML = "page size";

        let dropdownContainer = document.createElement("span");

        pageSize.innerHTML = "page size";

        let dropdown = createPageSizeSelect(settings);
       
        let pager = document.createElement("span");
        pager.className = "j-pager";

        dropdownContainer.appendChild(pageSize)
        dropdownContainer.appendChild(dropdown)

        settings.components.footer.appendChild(pager);
        settings.components.footer.appendChild(dropdownContainer);
    }
    function enableSorting(settings) {

        var grid = settings.components.grid;

        $(grid).find(".j-header-text").attr("href", "#" );

        $(grid).find(".j-header-text").click(function (e) {
            settings.sort = {};
            var $column = $(e.currentTarget.parentElement);
            var direction = $column.attr("sort-direction");
            settings.sort.PropertyName = $column.data("property")

            $(grid).find("th").removeAttr("sort-direction");

            if (direction === "ascending") {
                $column.attr("sort-direction", "descending");
                settings.sort.Direction = 1;
            }
            else {
                $column.attr("sort-direction", "ascending");
                settings.sort.Direction = 0;
            }
            $(grid).data("jondoGrid").dataSource.read();
        });
    }
    function enableFiltering(settings) {

        var cells = settings.components.table.getElementsByTagName("th");

        for (let i = 0; i < cells.length; i++) {
            var filter = document.createElement("a");
            filter.className = "jf-icon jf-filter"
 
            var filterBox = document.createElement("div");
            filterBox.className = "j-grid-filterbox"

            filter.addEventListener("click", function (e) {
                e.stopPropagation();
                var box = e.currentTarget.parentElement.getElementsByClassName("j-grid-filterbox")[0]
                if ($(box).css("display") === "none")
                    $(box).slideDown(200);
                else 
                    $(box).slideUp(200);
            });
            var select1 = document.createElement("select");
            var option1 = document.createElement("option");
            var option2 = document.createElement("option");
            var option3 = document.createElement("option");
            var option4 = document.createElement("option");

            var input = document.createElement("input");
            var saveButton = document.createElement("a");
            var clearButton = document.createElement("a");

            saveButton.className = "btn btn-light btn-sm";
            clearButton.className = "btn btn-light btn-sm";

            saveButton.innerHTML = "Save";
            clearButton.innerHTML = "Clear"

            var selectContainer = document.createElement("div");
            var inputContainer = document.createElement("div");
            var buttonContainer = document.createElement("div");

            var selectContainer = document.createElement("div");
            var inputContainer = document.createElement("div");
            var buttonContainer = document.createElement("div");

            option1.value = 1;
            option1.text = "Equals";
            option2.value = 2;
            option2.text = "Contains";
            option3.value = 3;
            option3.text = "Does not equal";
            option4.value = 4;
            option4.text = "Does not contain";

            input.type = "text";

            select1.appendChild(option1);
            select1.appendChild(option2);
            select1.appendChild(option3);
            select1.appendChild(option4);

            selectContainer.appendChild(select1);
            inputContainer.appendChild(input);
            buttonContainer.appendChild(saveButton);
            buttonContainer.appendChild(clearButton);

            filterBox.appendChild(selectContainer);

            filterBox.appendChild(inputContainer);
            filterBox.appendChild(buttonContainer);

            cells[i].appendChild(filter);
            cells[i].appendChild(filterBox);

            saveButton.addEventListener("click", function (e) {

                let $box, propertyName, select, type, input, value;

                $box = $(e.currentTarget).closest(".j-grid-filterbox");
                propertyName = $box.closest("th").data("property");
                select = $box.find("select")[0];
                type = select.options[select.selectedIndex];
                input = $box.find("input")[0];
                value = input.value;

                if (settings.filters[propertyName])
                    settings.filters[propertyName].push({ Type: type.value, Value: value });
                else
                    settings.filters[propertyName] = [{ Type: type.value, Value: value }];

                $box.slideUp(200);
                $box.closest("th").attr("filtered","");
                $(settings.components.grid).data("jondoGrid").dataSource.read();
            });

            clearButton.addEventListener("click", function (e) {
                var $box = $(e.currentTarget).closest(".j-grid-filterbox");
                var propertyName = $box.closest("th").data("property");
                settings.filters[propertyName] = undefined;
                $box.find("input").val("");
                $box.closest("th")[0].removeAttribute("filtered");
                $box.slideUp(200);
                $(settings.components.grid).data("jondoGrid").dataSource.read();
            });
        }
    }
    function createPageSizeSelect(settings) {

        var container = document.createElement("span");
        container.className = "j-dropdown-list";

        var panel = document.createElement("span");
        panel.className = "j-dropdown-panel";

        var items = settings.paging.pageSizes;

        var button = document.createElement("a");
        button.className = "button"

        if (!settings.paging.defaultSize)
            button.innerHTML = settings.paging.defaultSize
        else
            button.innerHTML = items[0];

        button.addEventListener("click", e => {
            e.stopPropagation();

            if (!$(container).hasClass("active")) {

                var height = window.scrollY + container.getBoundingClientRect().top + panel.offsetHeight;

                if (height > window.innerHeight) {
                    $(container).addClass("top");
                }

                $(container).addClass("active");
                $(panel).slideDown(150);
            }
            else {
                $(container).removeClass("active");
                $(panel).slideUp(150, () => $(container).removeClass("top"));
            }
            $("body").click(() => {
                $(container).removeClass("active");
                $(panel).slideUp(150, () => $(container).removeClass("top"));
            });
        });

        container.appendChild(button);
        container.appendChild(panel);

        var ul = document.createElement("ul");
        for (var i = 0; i < items.length; i++) {
          
            var li = document.createElement("li");
            li.value = items[i];
            li.innerHTML = items[i];
            ul.appendChild(li);
        }


        panel.appendChild(ul);

        $(ul).find("li").click(e => {
            button.innerHTML = e.currentTarget.innerHTML;
            settings.paging.curSize = e.currentTarget.value;
            $(e.currentTarget).closest(".j-grid").data("jondoGrid").dataSource.read();
        });


        return container;

    }
    function createUid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}








