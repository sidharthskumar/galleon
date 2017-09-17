$(function()
{
	$('.button').click(
		function(e)
		{
			var me = $(e.target);
			if(me.attr('data-value') == "0")
			{
				me.attr('data-value', "1");
				me.css('background-color', '#75B3FA');
				me.css('color', 'white');
			}
			else
			{
				me.attr('data-value', "0");
				me.css('background-color', 'white');
				me.css('color', '#75B3FA');
			}

			console.log(me.attr('data-value'));
			e.preventDefault();
		})
});