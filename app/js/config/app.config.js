/**
 * Created by Jean on 4/29/2015.
 */

//��ǰĿ¼���ڵĸ�Ŀ¼��index.html���ڵ�Ŀ¼
define({
    //app name
    appName: "app"
    , route: {
        //controller�ĸ�Ŀ¼
        //�ڵ��·����main.js��paths��ʼ
        controllerPath: "controllers/"
        //template�ĸ�Ŀ¼
        , templatePath: "views/"
        //·��ӳ��
        , mapping: [{
            //����,���ʵ�url��ַ
            url: "/"

            //����
            //�����templatePath��template��ַ
            , templateUrl: "default.html"

            //ѡ��,���ȱʡ,��controllerUrl�����templateUrl��������
            //��default.html,�����ɵ�controllerUrl��ַΪdefault
            //����:user/index.html,�����ɽ��Ϊ:user/index
            //, controllerUrl: "default"

            //ѡ��,���ȱʡ,��controller�����controllerUrl��������
            //controllerUrl:default --> controller:default
            //controllerUrl:user/index --> controller:index
            //, controller: "default"
        }]
    }
});