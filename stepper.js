document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.parent1 .one, .parent1 .two, .parent1 .three, .parent1 .four');
    const stage = document.querySelectorAll('.parent2 .one1, .parent2 .two2, .parent2 .three3, .parent2 .four4');
    const bars = document.querySelectorAll('.parent1 .b1, .parent1 .b2, .parent1 .b3, .parent1 .b4');
    const stepDescription = document.getElementById("stepDescription");
    const pre = document.querySelector('.navigation button:first-child');
    const nex = document.querySelector('.navigation button:last-child');

    let count = 0;
    const stageMessages = [
        'Add account details for further communication',
        'Add shipping address for successful delivery',
        'Complete the payment to complete the order',
        'Ready to get delivered!',
        'Order delivered successfully'
    ];

    function updatesteps() {
        steps.forEach((step, index) => {
            if (index < count) {
                step.classList.add('completed');
                step.classList.remove('active');
                stage[index].classList.remove('active');
                if (index < bars.length) {
                    bars[index].classList.add('completed');
                }
            } else if (index === count) {
                step.classList.add('active');
                step.classList.remove('completed');
                stage[index].classList.add('active');
                if (index > 0) {
                    bars[index - 1].classList.add('active');
                    bars[index - 1].classList.remove('completed');
                }
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
                stage[index].classList.remove('active');
                if (index < bars.length) {
                    bars[index].classList.remove('active');
                    bars[index].classList.remove('completed');
                }
            }
        });

        stepDescription.textContent = stageMessages[count];
        pre.disabled = count === 0;
        nex.textContent = (count === steps.length - 1) ? 'Finish' : 'Next';
        nex.disabled = count === steps.length;
    }

    nex.addEventListener('click', function() {
        if (count < steps.length - 1) {
            count += 1;
            updatesteps();
        } else if (count === steps.length - 1) {
            stepDescription.textContent = stageMessages[stageMessages.length - 1] + ' \uD83D\uDC90';
            steps[count].classList.add('completed');
            steps[count].classList.remove('active');
            stage[count].classList.remove('active');
            nex.disabled = true;
        }
    });

    pre.addEventListener('click', function() {
        if (count > 0) {
            if (count - 1 < bars.length) {
                bars[count - 1].classList.remove('active');
                bars[count - 1].classList.remove('completed');
            }
            count -= 1;
            updatesteps();
            nex.disabled = false;
        }
    });

    updatesteps();
});
