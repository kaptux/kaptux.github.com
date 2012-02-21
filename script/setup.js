

function applyTemplate(item, template){
	for(var key in item){
		var rgx = new RegExp('{{' + key + '}}', 'g');
		template = template.replace(rgx, item[key]);
	}	
	return template;
}


function loadImages(photosetId) {
  var photoSet = getPhotoset(photosetId);
  if(photoSet==null){
    alert('Photoset no encontrado!!');
    return;
  }
  var thumbs = $('<ul class="thumbs"></ul>');
  for(var i=0;i<photoSet.photos.length;i++)
    thumbs.append(buildPhotoElement(photoSet.photos[i]));

  $(thumbs).find('a').colorbox();
  $('#content').append(thumbs);
}

function buildPhotoElement(photo){
  var photoTemplate =  
  '<li>'+
    '<a rel="colorbox" href="{{size_z}}" title="{{title}}">' +
      '<img src="{{size_m}}" alt="{{title}}" height="180px" />' +
    '</a>' +
  '</li>';

  var photoObject = {
    'title'  : photo['title'],
    'url'    : photo['url'],
    'size_z' : photo['url'].replace('.jpg', '_z.jpg'),
    'size_m' : photo['url'].replace('.jpg', '_m.jpg'),
    'size_b' : photo['url'].replace('.jpg', '_b.jpg'),
    'size_s' : photo['url'].replace('.jpg', '_s.jpg')
  };

  return applyTemplate(photoObject, photoTemplate);
}

function getPhotoset(photosetId)
{
  for(var i=0;i<photosets.length;i++)
    if(photosets[i]['id']==photosetId)
      return photosets[i];

  return null;
}

$(document).ready(function(){
	$('#menu A').click(function(){
		var photosetId = $(this).attr('photosetid');
    $('#menu .selected').removeClass('selected');
    $(this).addClass('selected');
    $('#content').empty();
    loadImages(photosetId);
	});
});
