(function(){

	var piebutton = document.getElementById('pie_button'),
    	piewrapper = document.getElementById('pie_nav-wrapper'),
    	piezoom = document.getElementById('pie_zoom'),
    	piezoom_wrapper =document.getElementById('pie_zoom-wrapper'),
		piefilter = document.getElementById('pie_filter'),
		piefilter_wrapper =document.getElementById('pie_filter-wrapper'),
		piesearch = document.getElementById('pie_search'),
		piesearch_wrapper =document.getElementById('pie_search-wrapper');


	var pieopen = false;
	var pieopen_zoom = false;
	var pieopen_filter = false;
	var pieopen_search = false;

	piebutton.addEventListener('click', piehandler, false);
	piezoom.addEventListener('click', piehandler_zoom, false);
	piefilter.addEventListener('click', piehandler_filter, false);
	piesearch.addEventListener('click', piehandler_search, false);

	function piehandler(){
	  if(!pieopen){
	    this.innerHTML = "Close";
	    classie.add(piewrapper, 'opened-nav');
	    pieopen = !pieopen;
	  }

	  else if(!pieopen_zoom&&!pieopen_filter){
		  if(!pieopen_search) {
			  this.innerHTML = "Menu";
			  classie.remove(piewrapper, 'opened-nav');
			  pieopen = !pieopen;
		  }
	  	}
		if(pieopen_zoom){
			classie.remove(piezoom_wrapper, 'opened-nav');
			pieopen_zoom = !pieopen_zoom;
		}
	  	if(pieopen_filter){
	  		classie.remove(piefilter_wrapper, 'opened-nav');
	  		pieopen_filter = !pieopen_filter;
	  	}
		if(pieopen_search){
			classie.remove(piesearch_wrapper, 'opened-nav');
			pieopen_search = !pieopen_search;
		}
	}
	function piehandler_zoom(){
		if(!pieopen_zoom){

			classie.add(piezoom_wrapper, 'opened-nav');

		}
		else{

			classie.remove(piezoom_wrapper, 'opened-nav');
		}
		pieopen_zoom = !pieopen_zoom;
	}
	function piehandler_filter(){
		if(!pieopen_filter){

			classie.add(piefilter_wrapper, 'opened-nav');

		}
		else{

			classie.remove(piefilter_wrapper, 'opened-nav');
		}
		pieopen_filter = !pieopen_filter;
	}
	function piehandler_search(){
		if(!pieopen_search){

			classie.add(piesearch_wrapper, 'opened-nav');

		}
		else{

			classie.remove(piesearch_wrapper, 'opened-nav');
		}
		pieopen_search = !pieopen_search;
	}

	var stackbutton = document.getElementById('stack_button'),
		stackwrapper = document.getElementById('stack_nav-wrapper'),
		stackzoom = document.getElementById('stack_zoom'),
		stackzoom_wrapper =document.getElementById('stack_zoom-wrapper'),
		stackfilter = document.getElementById('stack_filter'),
		stackfilter_wrapper =document.getElementById('stack_filter-wrapper'),
		stacksearch = document.getElementById('stack_search'),
		stacksearch_wrapper =document.getElementById('stack_search-wrapper');
	var stackopen = false;
	var stackopen_zoom = false;
	var stackopen_filter = false;
	var stackopen_search = false;
	stackbutton.addEventListener('click', stackhandler, false);
	stackzoom.addEventListener('click', stackhandler_zoom, false);
	stackfilter.addEventListener('click', stackhandler_filter, false);
	stacksearch.addEventListener('click', stackhandler_search, false);
	function stackhandler(){
		if(!stackopen){
			this.innerHTML = "Close";
			classie.add(stackwrapper, 'opened-nav');
			stackopen = !stackopen;
		}
		else if(!stackopen_zoom&&!stackopen_filter){
			if(!stackopen_search) {
				this.innerHTML = "Menu";
				classie.remove(stackwrapper, 'opened-nav');
				stackopen = !stackopen;
			}
		}
		if(stackopen_zoom){
			classie.remove(stackzoom_wrapper, 'opened-nav');
			stackopen_zoom = !stackopen_zoom;
		}
		if(stackopen_filter){
			classie.remove(stackfilter_wrapper, 'opened-nav');
			stackopen_filter = !stackopen_filter;
		}
		if(stackopen_search){
			classie.remove(stacksearch_wrapper, 'opened-nav');
			stackopen_search = !stackopen_search;
		}
	}
	function stackhandler_zoom(){
		if(!stackopen_zoom){
			classie.add(stackzoom_wrapper, 'opened-nav');
		}
		else{
			classie.remove(stackzoom_wrapper, 'opened-nav');
		}
		stackopen_zoom = !stackopen_zoom;
	}
	function stackhandler_filter(){
		if(!stackopen_filter){
			classie.add(stackfilter_wrapper, 'opened-nav');
		}
		else{
			classie.remove(stackfilter_wrapper, 'opened-nav');
		}
		stackopen_filter = !stackopen_filter;
	}
	function stackhandler_search(){
		if(!stackopen_search){
			classie.add(stacksearch_wrapper, 'opened-nav');
		}
		else{
			classie.remove(stacksearch_wrapper, 'opened-nav');
		}
		stackopen_search = !stackopen_search;
	}


	var multibutton = document.getElementById('multi_button'),
		multiwrapper = document.getElementById('multi_nav-wrapper'),
		multizoom = document.getElementById('multi_zoom'),
		multizoom_wrapper =document.getElementById('multi_zoom-wrapper'),
		multifilter = document.getElementById('multi_filter'),
		multifilter_wrapper =document.getElementById('multi_filter-wrapper'),
		multisearch = document.getElementById('multi_search'),
		multisearch_wrapper =document.getElementById('multi_search-wrapper');
	var multiopen = false;
	var multiopen_zoom = false;
	var multiopen_filter = false;
	var multiopen_search = false;
	multibutton.addEventListener('click', multihandler, false);
	multizoom.addEventListener('click', multihandler_zoom, false);
	multifilter.addEventListener('click', multihandler_filter, false);
	multisearch.addEventListener('click', multihandler_search, false);
	function multihandler(){
		if(!multiopen){
			this.innerHTML = "Close";
			classie.add(multiwrapper, 'opened-nav');
			multiopen = !multiopen;
		}
		else if(!multiopen_zoom&&!multiopen_filter){
			if(!multiopen_search) {
				this.innerHTML = "Menu";
				classie.remove(multiwrapper, 'opened-nav');
				multiopen = !multiopen;
			}
		}
		if(multiopen_zoom){
			classie.remove(multizoom_wrapper, 'opened-nav');
			multiopen_zoom = !multiopen_zoom;
		}
		if(multiopen_filter){
			classie.remove(multifilter_wrapper, 'opened-nav');
			multiopen_filter = !multiopen_filter;
		}
		if(multiopen_search){
			classie.remove(multisearch_wrapper, 'opened-nav');
			multiopen_search = !multiopen_search;
		}
	}
	function multihandler_zoom(){
		if(!multiopen_zoom){
			classie.add(multizoom_wrapper, 'opened-nav');
		}
		else{
			classie.remove(multizoom_wrapper, 'opened-nav');
		}
		multiopen_zoom = !multiopen_zoom;
	}
	function multihandler_filter(){
		if(!multiopen_filter){
			classie.add(multifilter_wrapper, 'opened-nav');
		}
		else{
			classie.remove(multifilter_wrapper, 'opened-nav');
		}
		multiopen_filter = !multiopen_filter;
	}
	function multihandler_search(){
		if(!multiopen_search){
			classie.add(multisearch_wrapper, 'opened-nav');
		}
		else{
			classie.remove(multisearch_wrapper, 'opened-nav');
		}
		multiopen_search = !multiopen_search;
	}


	var cloudbutton = document.getElementById('cloud_button'),
		cloudwrapper = document.getElementById('cloud_nav-wrapper'),
		cloudzoom = document.getElementById('cloud_zoom'),
		cloudzoom_wrapper =document.getElementById('cloud_zoom-wrapper'),
		cloudfilter = document.getElementById('cloud_filter'),
		cloudfilter_wrapper =document.getElementById('cloud_filter-wrapper'),
		cloudsearch = document.getElementById('cloud_search'),
		cloudsearch_wrapper =document.getElementById('cloud_search-wrapper');
	var cloudopen = false;
	var cloudopen_zoom = false;
	var cloudopen_filter = false;
	var cloudopen_search = false;
	cloudbutton.addEventListener('click', cloudhandler, false);
	cloudzoom.addEventListener('click', cloudhandler_zoom, false);
	cloudfilter.addEventListener('click', cloudhandler_filter, false);
	cloudsearch.addEventListener('click', cloudhandler_search, false);
	function cloudhandler(){
		if(!cloudopen){
			this.innerHTML = "Close";
			classie.add(cloudwrapper, 'opened-nav');
			cloudopen = !cloudopen;
		}
		else if(!cloudopen_zoom&&!cloudopen_filter){
			if(!cloudopen_search) {
				this.innerHTML = "Menu";
				classie.remove(cloudwrapper, 'opened-nav');
				cloudopen = !cloudopen;
			}
		}
		if(cloudopen_zoom){
			classie.remove(cloudzoom_wrapper, 'opened-nav');
			cloudopen_zoom = !cloudopen_zoom;
		}
		if(cloudopen_filter){
			classie.remove(cloudfilter_wrapper, 'opened-nav');
			cloudopen_filter = !cloudopen_filter;
		}
		if(cloudopen_search){
			classie.remove(cloudsearch_wrapper, 'opened-nav');
			cloudopen_search = !cloudopen_search;
		}
	}
	function cloudhandler_zoom(){
		if(!cloudopen_zoom){
			classie.add(cloudzoom_wrapper, 'opened-nav');
		}
		else{
			classie.remove(cloudzoom_wrapper, 'opened-nav');
		}
		cloudopen_zoom = !cloudopen_zoom;
	}
	function cloudhandler_filter(){
		if(!cloudopen_filter){
			classie.add(cloudfilter_wrapper, 'opened-nav');
		}
		else{
			classie.remove(cloudfilter_wrapper, 'opened-nav');
		}
		cloudopen_filter = !cloudopen_filter;
	}
	function cloudhandler_search(){
		if(!cloudopen_search){
			classie.add(cloudsearch_wrapper, 'opened-nav');
		}
		else{
			classie.remove(cloudsearch_wrapper, 'opened-nav');
		}
		cloudopen_search = !cloudopen_search;
	}

	function closeWrapper(){
		classie.remove(piewrapper, 'opened-nav');
	}



})();
$(function() {
	$( "#amount" ).val(  $( "#slider-range" ).slider( "values", 0 ) +
		" - " + $( "#slider-range" ).slider( "values", 1 ) );
});

$(function() {
	$( "#amount_pie" ).val(  $( "#slider-range_pie" ).slider( "values", 0 ) +
		" - " + $( "#slider-range_pie" ).slider( "values", 1 ) );
});

function Search(i){
	switch (i){
		case 1:
			var searchVal = $("#mySearch").val();
			break;
		case 2:
			var searchVal = $("#mySearch_s").val();
			break;
		case 3:
			var searchVal = $("#mySearch_c").val();
			break;
	}

	if(window.pieChartName.indexOf(searchVal)> -1) {
		var selectPie = d3.select("#PieChartSVG1").selectAll('path.pie-' + searchVal);
		d3.select("#PieChartSVG1").selectAll('path.pie-path').style('fill', function () {
			return d3.select(this).attr('data-fill');
		});
		selectPie.style('fill', 'red');
	}
	if(window.stackChartName.indexOf(searchVal)> -1){
		var selectStack =d3.select("#svgStack1").selectAll('rect.stack-'+searchVal);

		d3.select("#svgStack1").selectAll('rect.stack-path').style('fill;',function(){
			return d3.select(this).attr('data-fill');
		});
		selectStack.style('outline','solid red');

	}
	if(window.tagCloudName.indexOf(searchVal)> -1){
		var selectTag =d3.select(".wordcloud").selectAll('text.tag-'+searchVal);
		d3.select(".wordcloud").selectAll('text.tag-wordcloud').style('fill',function(){
			return d3.select(this).attr('data-fill');
		});
		selectTag.style('fill','red');
	}
}

$("#slider-range_pie").slider({
	range: true,
	min: 0,
	max: 15,
	values: [0,15],
	slide: function (event, ui) {

		$("#amount_pie").val(ui.values[0] + " - " + ui.values[1]);

		var begin = ui.values[0];
		var end = ui.values[1];


		minVal_pie = ui.values[0];
		maxVal_pie = ui.values[1];

		var piechart = new Chart.PieChart(d3.select('#piechart1'));
		piechart.render();


	}
});

function piereset(){
	minVal_pie=1;
	maxVal_pie=5;
	var piechart = new Chart.PieChart(d3.select('#piechart1'));
	piechart.render();

}

function stackreset(){
	minVal=0;
	maxVal=999999999;
	var stack = new Chart.Stack(d3.select('#graph'));
	stack.render();

}

function cloudfilter(i){
	i=c;
	var tagcloud = new Chart.TagCloud(d3.select('#tagcloud'));
	tagcloud.render();
}

function menuWechseln(id) {
	var pie = document.getElementById('pie_button');
	var stack = document.getElementById('stack_button');
	var line = document.getElementById('multi_button');
	var cloud = document.getElementById('cloud_button');
	if (id == 'pie_button') {
		if (pie.style.display == 'none') {
			pie.style.display = 'block';
		}
		else{
			pie.style.display = 'none';
		}
			stack.style.display = 'none';
			line.style.display = 'none';
			cloud.style.display = 'none';
			
	}

	else if (id == 'stack_button') {
		if (stack.style.display == 'none') {
			stack.style.display = 'block';
		}
		else {
			stack.style.display = 'none';
		}
			line.style.display = 'none';
			cloud.style.display = 'none';
			pie.style.display = 'none';


	}
	else if (id == 'multi_button') {
		if (line.style.display == 'none') {
			line.style.display = 'block';
		}
		else {
			line.style.display = 'none';
		}
			stack.style.display = 'none';
			cloud.style.display = 'none';
			pie.style.display = 'none';


	}
	else {
		if (cloud.style.display == 'none') {
			cloud.style.display = 'block';
		}
		else{
			cloud.style.display = 'none';
		}
			stack.style.display = 'none';
			line.style.display = 'none';
			pie.style.display = 'none';


	}
}