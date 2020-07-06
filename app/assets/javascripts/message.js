
  $(function(){ 
    function buildHTML(message){
     if ( message.image ) {
       var html =
          `<div class="message_list">
             <div class="message__list__info">
               ${message.user_name}
             </div>
             <div class="message__list__time">
               ${message.created_at}
             </div>
           </div>
           <div class="message__text">
             <p class="message__text__list">
               ${message.content}
             </p>
           </div>
           <img src=${message.image} >`
       return html;
     } else {
       var html =
        `<div class="message_list">
          <div class="message__list__info">
            ${message.user_name}
          </div>
          <div class="message__list__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__list">
            ${message.content}
          </p>
        </div>`
       return html;
     };
  }
  $('#new_message').on('submit', function(e){
    
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('form')[0].reset();
      $('input').prop('disabled', false);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      return false
    })
      .fail(function(){
        alert("メッセージ送信に失敗しました")
      });
  });
 });