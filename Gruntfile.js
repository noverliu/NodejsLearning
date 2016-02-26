module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
            },
            buildall: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录下
                    src: '**/*.js', //所有js文件
                    dest: 'dist' //输出到此目录下
                }]
            }
        },
        // cssmin:{
        // 	css: {
        //         src:'dist/css/all.css',
        //         dest:'dist/css/all-min.css'
        //     }
        // },
        cssmin:{
        	css:{
        		src:'dist/css/all.css',
        		dest:'dist/css/all.min.css'
        	}
        },
		concat: {
			options: {
				separator: ';'
			},
			// dist: {
			// 	src: ['src/**/*.js'],
			// 	dest: 'dist/<%= pkg.name %>.js'
			// },
			css:{
				src:['src/css/*.css'],
				dest: 'dist/css/all.css'
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.js','src/**/*.css'],
				tasks: ['minall'],
				options: {
					spawn: true,
					interrupt: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-css');

	grunt.registerTask('minall', ['concat','uglify:buildall','cssmin']);
	grunt.registerTask('default', ['concat', 'uglify']);
}