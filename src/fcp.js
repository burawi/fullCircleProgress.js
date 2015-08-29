$.fn.fullCircleProgress = function(parameters){
    var container = this,
        data = {};
    $.extend(data,parameters);
    var linked = true,
        svg = '<svg width="'+data.side+'" height="'+data.side+'">',
        center = (data.side) / 2,
        angle = 360 - (((360 / data.levels) + 360 - 90) % 360),
        endPoints = {
            x: center + (center * Math.abs(Math.cos(toRadians(angle)))),
            y: center + (center * Math.sin(toRadians(angle)) * -1)
        },
        achievedStyle,leftStyle,hoverStyle;
    if(data.linked != null){
        linked = data.linked;
    }
    if(data.backgroundImage != null){
        var pattern = '<defs><pattern id="bgImageFCP" patternUnits="userSpaceOnUse" width="'+data.side+'" height="'+data.side+'"><image xlink:href="'+data.backgroundImage+'" x="0" y="0" width="'+data.side+'" height="'+data.side+'" /></pattern></defs>';
        svg += pattern;
        svg += '<circle cx="'+center+'" cy="'+center+'" r="'+center+'" fill="url(#bgImageFCP)" />';
    }
    for(var i = 0; i < data.levels; i++){
        var color = '#000';
        if(data.colors != null){
            if(i < data.colors.length){
                color = data.colors[i];
            }else{
                if(data.alternativeColor != null){
                    color = data.alternativeColor;
                }else{
                    color = data.colors[0];
                }
            }
        }else if(data.alternativeColor != null){
            color = data.alternativeColor;
        }
        var g = '<g level="'+(i+1)+'" transform="rotate('+(i*360/data.levels)+','+center+','+center+')">';
        var p = '<path style="fill:'+color+'" d="M '+center+' '+center+' L '+center+' 0 A '+( data.side / 2) +' '+ (data.side / 2) +' 0 0 1 '+endPoints.x+' '+endPoints.y+' Z"/>';
        g += p;
        g += '</g>';
        svg += g;
    }
    svg += '</svg>';
    $(container).append(svg);
    if(data.achievedStyle != null){
        achievedStyle = data.achievedStyle;
    }else{
        achievedStyle = {
            "opacity": "1"
        };
    }
    if(data.leftStyle != null){
        leftStyle = data.leftStyle;
    }else{
        leftStyle = {
            "opacity": "0.3"
        };
    }
    if(data.hoverStyle != null){
        hoverStyle = data.hoverStyle;
    }else{
        hoverStyle = {
            "opacity": "0.8"
        };
    }
    setStyle();
    if(data.onClick != null){
        $(container).find('g').click(function(){
            data.onClick($(this).attr('level'));
        });
    }
    if(data.onHover != null){
        $(container).find('g').hover(
            function(){
                data.onHover[0]($(this).attr('level'));
            },function(){
                data.onHover[1]($(this).attr('level'));
            }
        );
    }
    if(data.onHover != null || data.onClick != null){
        $(container).find('g').css("cursor","pointer");
        $(container).find('g').hover(
            function(){
                var level = parseInt($(this).attr('level'));
                if(linked){
                    for(var i = 0; i < level; i++){
                        $(container).find('[level='+(i+1)+']').css(hoverStyle);
                    }
                }else{
                    $(this).css(hoverStyle);
                }
            },function(){
                if(linked){
                    setStyle();
                }else{
                    if($(this).attr('level') <= data.level)
                        $(this).css(achievedStyle);
                    else
                        $(this).css(leftStyle);
                }
            }
        );
    }
    function setStyle(){
        for(var i = 0; i < data.levels; i++){
            if(i < data.level)
                $(container).find('[level='+(i+1)+']').css(achievedStyle);
            else
                $(container).find('[level='+(i+1)+']').css(leftStyle);
        }
    }
    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }
}
