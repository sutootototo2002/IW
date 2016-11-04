module.exports = function(grunt){
    //任务配置，所有插件的配置信息
  grunt.initConfig({
    //获取 package.json的信息
    pkg:grunt.file.readJSON('package.json'),
    uglify:{
    	options:{
    		stripBanners:true,
    		banner:'/*!<%=pkg.name%>-<%=pkg.version%>.js<%= grunt.template.today("yyyy-mm-dd") %>*/\n'
    	}, 	
    	dist:{
    		files:{
    			'js/test.min.js':['js/test.js'],
    			'js/test1.min.js':['js/test1.js'],
    		}
    	}   	
    },
    cssmin: {
	  	target: {
		    files: [{
		      expand: true,
		      cwd: 'css/',
		      src: ['*.css', '!*.min.css'],
		      dest: 'css/',
		      ext: '.min.css'
		    }]
        }
    },
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['js/test.min.js', 'js/test1.min.js'],
      dest: 'js/built.js',
    },
  },
  jshint: {
    all: ['build/js/gruntfiled.js', 'js/test.js']
  },
 
watch: {
  build: {
    files: ['js/test.js'],
    tasks: ['jshint','uglify'],
    options: {
      spawn: false,
    }
  },
}

});
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin'); 
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-karma'); 
  //告诉grunt当我们在终端中输入grunt时需要做什么
  grunt.registerTask('default',['uglify','cssmin','concat','jshint','watch']);
}
