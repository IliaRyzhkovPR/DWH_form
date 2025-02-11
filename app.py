from flask import Flask, render_template, request

app = Flask(__name__)

def calculate_score(answers):
    """
    Calculate the preparedness score based on the given answers.
    
    Scoring rules:
    - 'None' answers = 0 points
    - 'Other' answers = 0.5 points
    - 'Manual IT Request' for q5 = 0 points
    - All other valid answers = 1 point
    """
    max_score_per_question = 1.0
    total_questions = 6
    total_score = 0.0
    
    for q_num in range(1, total_questions + 1):
        q_key = f'q{q_num}'
        answer = answers.get(q_key)
        
        if answer is None:
            continue
            
        if answer == 'None':
            score = 0.0
        elif answer == 'Other':
            score = 0.5
        elif q_key == 'q5' and answer == 'Manual IT Request':
            score = 0.0
        else:
            score = 1.0
            
        total_score += score
    
    max_possible_score = total_questions * max_score_per_question
    percentage = (total_score / max_possible_score) * 100
    
    return round(percentage)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get all form responses
        answers = {
            'q1': request.form.get('q1'),
            'q2': request.form.get('q2'),
            'q3': request.form.get('q3'),
            'q4': request.form.get('q4'),
            'q5': request.form.get('q5'),
            'q6': request.form.get('q6')
        }
        
        # Calculate the score
        score = calculate_score(answers)
        return render_template('result.html', score=score)

    return render_template('form.html')

# This allows the app to run both locally and on Vercel
if __name__ == '__main__':
    # Running locally
    app.run(debug=True)
else:
    # Running on Vercel
    app.debug = False