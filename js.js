"use strict";

function MyDataTable(data) {
    let page = 1;
    let pageSize = 10;

    var dt = this;

    this.init = function () {

        var dge = function (el) {
            return document.getElementById(el);
        };
        
        var buff = '<table id="myTable" class="maintable">' +
            '<tr class="orderBy">' +
            '<th' + (dt.sortBy === 'Name' ? ' class="current d' + dt.sortDir + '"' : '') + '>Name</th>' +
            '<th' + (dt.sortBy === 'Position' ? ' class="current d' + dt.sortDir + '"' : '') + '>Position</th>' +
            '<th' + (dt.sortBy === 'Office' ? ' class="current d' + dt.sortDir + '"' : '') + '>Office</th>' +
            '<th' + (dt.sortBy === 'Age' ? ' class="current d' + dt.sortDir + '"' : '') + '>Age</th>' +
            '<th' + (dt.sortBy === 'Start date' ? ' class="current d' + dt.sortDir + '"' : '') + '>Start date</th>' +
            '<th' + (dt.sortBy === 'Salary' ? ' class="current d' + dt.sortDir + '"' : '') + '>Salary</th>' +
            '</tr>';
      
        // Вывести текущую страницу результатов:
        let from = (page - 1) * pageSize;
        let to = from + pageSize;
        if (to > data.length) {
            to = data.length;
        }

        for (let i = from; i < to; i++) {
            buff += '<tr>' +
                '<td>' + data[i].name + '</td>' +
                '<td>' + data[i].position + '</td>' +
                '<td>' + data[i].office + '</td>' +
                '<td>' + data[i].age + '</td>' +
                '<td>' + data[i].Startdate + '</td>' +
                '<td>' + data[i].salary + '</td>' +
                '</tr>';
        }

        buff += '</table>';
       
        // Пагинация
        buff += '<div сlass="pagination">' + '<a class="prev">Previous    </a>';
        for (let i = 0; i < data.length / pageSize; i++) {
            buff += '<a class="setPage' + (i + 1 === page ? ' currentPage' : '') + '">' + (i + 1) + '</a> ';
        }
        buff += '<a class="next">    Next</a></div>';
        
       // Поиск
        let button =  document.getElementById("MyButton");
        button.addEventListener('click', function () {
            let input, filter, table, tr, td0, td2, td1, td3, td4, td5;
        
            input = document.getElementById("searchInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                
                td0 = tr[i].getElementsByTagName("td")[0];
                td1 = tr[i].getElementsByTagName("td")[1];
                td2 = tr[i].getElementsByTagName("td")[2];
                td3 = tr[i].getElementsByTagName("td")[3];
                td4 = tr[i].getElementsByTagName("td")[4];
                td5 = tr[i].getElementsByTagName("td")[5];
                
                
                if (td0.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (td2.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (td3.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (td4.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (td5.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }else {
                    tr[i].style.display = "none";
                }
            }
        });

        dge('container').innerHTML = buff;


        // Сортировка:
        let sortLink = document.querySelectorAll('.orderBy th');
        for (let i = 0; i < sortLink.length; i++) {
            sortLink[i].addEventListener('click', function () {
                let sortBy = event.target.innerHTML;
                dt.sortDir = 1 - dt.sortDir;

                if (dt.sortBy === sortBy) {
                } else {
                    dt.sortDir = 1;
                }
                dt.sortBy = sortBy;

                if (sortBy === 'Age') {
                    data.sort(function (a, b) {
                        return a.age - b.age;
                    });
                    
                } else if( sortBy === 'Start date'){
                    data.sort(function(a, b){
                        let aa = a.Startdate.split('/').reverse().join();
                        let bb = b.Startdate.split('/').reverse().join();
                            return aa < bb ? -1 : (aa > bb ? 1 : 0);
                    });
                } else if( sortBy === 'Salary'){
                    data.sort(function(a, b){
                        let aa = a.salary.slice(1).replace(/,/, '.');
                        let bb = b.salary.slice(1).replace(/,/, '.');
                            return Number(aa) - Number(bb);
                    });
                } else {

                    data.sort(function (a, b) {
                        return a[sortBy] > b[sortBy];
                    });
                }

                if (!dt.sortDir) {
                    data.reverse();
                }
                page = 1;
                dt.init();
            });
        }

        let pagerLink = document.querySelectorAll('.setPage');
        let prev = document.querySelector('.prev');
        let next = document.querySelector('.next');

        prev.addEventListener('click', function () {
            
            if(page !== 1) {
                page--;
            }  else {
                page = 1;
            }
                    
           dt.init();
                
        });

        next.addEventListener('click', function () {
            
            if(page !== Math.ceil(data.length / pageSize)) {
                page++;
            }  else {
                page = Math.ceil(data.length / pageSize);
            }
                    
            dt.init();
                
        });

        for (let i = 0; i < pagerLink.length; i++) {
            pagerLink[i].addEventListener('click', function (event) {
               
                page = Number(event.target.innerHTML);
                    
                dt.init();
                
            });
        }

    };
    this.init();
}

