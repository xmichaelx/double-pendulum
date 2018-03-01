(function (document) {
    'use strict';

    var VIEW_WIDTH = 640,
        VIEW_HEIGHT = 640,
        FRAMES_PER_SECOND = 60,
        HALF_WIDTH = VIEW_WIDTH / 2,
        HALF_HEIGHT = VIEW_HEIGHT / 2;

    function createPendulum(setup) {
        var canvas = document.getElementById(setup.canvasId),
        context = canvas.getContext('2d');

        canvas.width = VIEW_WIDTH;
        canvas.height = VIEW_HEIGHT;

        return {
            'pendulum': new Pendulum(setup.initialConditions, context, FRAMES_PER_SECOND),
            'context': context
        } ;
    }
    
    var ids = [
        {
            canvasId: "canvas1",
            initialConditions: [3 * Math.PI / 4, Math.PI, 0, 0+ 0.00001]
        }, 
        {
            canvasId:  "canvas2",
            initialConditions: [3 * Math.PI / 4, Math.PI, 0, 0]
        }
    ];
    var list = ids.map(createPendulum);

    requestAnimationFrame(update);

    /**
     * Update loop
     */
    function update() {
        list.forEach(x => {
            x.context.setTransform(1, 0, 0, 1, 0, 0);
            x.context.translate(HALF_WIDTH, HALF_HEIGHT);
            x.context.clearRect(-HALF_WIDTH, -HALF_HEIGHT, VIEW_WIDTH, VIEW_HEIGHT);

            x.pendulum.draw();
            x.pendulum.step();
        });

        requestAnimationFrame(update);
    }

})(document);
