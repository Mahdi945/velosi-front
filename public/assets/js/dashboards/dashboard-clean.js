// Dashboard Charts - Version nettoyée pour Angular
$(function () {
  "use strict";

  // =====================================
  // Chart simple pour commencer
  // =====================================
  if (document.querySelector("#chart")) {
    var chartOptions = {
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chart: {
        type: "area",
        height: 350,
        fontFamily: "inherit",
        foreColor: "#a1aab2",
        toolbar: {
          show: false,
        },
      },
      colors: ["var(--bs-primary)"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        categories: [
          "16/08",
          "17/08",
          "18/08",
          "19/08",
          "20/08",
          "21/08",
          "22/08",
        ],
      },
      yaxis: {
        min: -5,
        max: 110,
        tickAmount: 4,
        title: {
          text: 'Sales',
        },
      },
      tooltip: {
        theme: "dark",
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
    chart.render();
  }

  // =====================================
  // Salary Chart
  // =====================================
  if (document.querySelector("#salary")) {
    var salaryOptions = {
      series: [
        {
          name: "Salary",
          data: [20, 15, 30, 25, 10, 15],
        },
      ],
      chart: {
        type: "bar",
        height: 165,
        fontFamily: "inherit",
        foreColor: "#a1aab2",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["var(--bs-primary)"],
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          startingShape: "flat",
          endingShape: "rounded",
          columnWidth: "60%",
          barHeight: "20%",
          distributed: true,
          borderRadius: 2,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2.5,
        colors: ["rgba(0,0,0,0.01)"],
      },
      xaxis: {
        categories: [["Apr"], ["May"], ["June"], ["July"], ["Aug"], ["Sept"]],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
      },
    };

    var salaryChart = new ApexCharts(document.querySelector("#salary"), salaryOptions);
    salaryChart.render();
  }

  // =====================================
  // Customers Chart
  // =====================================
  if (document.querySelector("#customers")) {
    var customersOptions = {
      series: [
        {
          name: "Customers",
          data: [30, 25, 35, 20, 30, 40],
        },
      ],
      chart: {
        id: "sparkline3",
        type: "area",
        height: 80,
        fontFamily: "inherit",
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        colors: ["var(--bs-primary)"],
        type: "solid",
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: true,
          position: "right",
        },
        x: {
          show: false,
        },
      },
    };
    var customersChart = new ApexCharts(document.querySelector("#customers"), customersOptions);
    customersChart.render();
  }

  // Ajoutez d'autres graphiques selon vos besoins...
});
