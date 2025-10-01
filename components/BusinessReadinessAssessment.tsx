import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Brain, Target, AlertCircle, CheckCircle, TrendingUp, Clock, Download, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple' | 'scale' | 'single';
  options: string[];
  category: string;
  weight: number;
}

interface AssessmentResult {
  score: number;
  category: string;
  recommendations: string[];
  nextSteps: string[];
  riskFactors: string[];
  opportunities: string[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  // Current State Analysis
  {
    id: 'infrastructure',
    question: 'What best describes your current technology infrastructure?',
    type: 'single',
    options: [
      'Legacy systems with minimal integration',
      'Mix of modern and legacy systems',
      'Mostly modern cloud-based infrastructure',
      'Cutting-edge, fully integrated ecosystem'
    ],
    category: 'infrastructure',
    weight: 3
  },
  {
    id: 'data_maturity',
    question: 'How would you rate your organization\'s data maturity?',
    type: 'scale',
    options: ['1 - Siloed data, manual processes', '2 - Basic data collection', '3 - Centralized data warehouse', '4 - Real-time analytics', '5 - AI-driven insights'],
    category: 'infrastructure',
    weight: 4
  },
  
  // Strategic Alignment
  {
    id: 'budget_range',
    question: 'What is your annual innovation/transformation budget?',
    type: 'single',
    options: [
      'Under $500K',
      '$500K - $2M',
      '$2M - $10M',
      'Over $10M'
    ],
    category: 'strategic',
    weight: 5
  },
  {
    id: 'timeline',
    question: 'What is your ideal timeline for seeing measurable transformation results?',
    type: 'single',
    options: [
      'Within 3 months',
      '3-6 months',
      '6-12 months',
      '12+ months'
    ],
    category: 'strategic',
    weight: 3
  },
  
  // Change Readiness
  {
    id: 'leadership_buy_in',
    question: 'How would you rate C-suite commitment to AI/digital transformation?',
    type: 'scale',
    options: ['1 - Skeptical', '2 - Cautious', '3 - Supportive', '4 - Champions', '5 - Evangelists'],
    category: 'change',
    weight: 5
  },
  {
    id: 'team_skills',
    question: 'What describes your team\'s technical transformation readiness?',
    type: 'single',
    options: [
      'Limited technical skills, need extensive training',
      'Basic technical competency, some training needed',
      'Strong technical team, minimal training required',
      'Expert-level team, ready for advanced implementations'
    ],
    category: 'change',
    weight: 4
  },
  
  // Technology Assessment
  {
    id: 'current_tools',
    question: 'Which best describes your current AI/automation usage?',
    type: 'single',
    options: [
      'No current AI implementations',
      'Basic automation tools (RPA, workflows)',
      'Some AI pilots or proof-of-concepts',
      'Production AI systems with measurable ROI'
    ],
    category: 'technology',
    weight: 4
  },
  {
    id: 'integration_complexity',
    question: 'How complex are your current system integrations?',
    type: 'scale',
    options: ['1 - Simple', '2 - Moderate', '3 - Complex', '4 - Very Complex', '5 - Extremely Complex'],
    category: 'technology',
    weight: 3
  }
];

export function BusinessReadinessAssessment({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = assessmentQuestions.length + 1; // +1 for comments section
  const currentProgress = showComments ? assessmentQuestions.length : Math.min(Object.keys(answers).length, currentStep + 1);
  const progress = (currentProgress / totalSteps) * 100;

  const generatePDF = () => {
    const doc = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Smart Factory - AI Business Readiness Assessment Results</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #3B82F6; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #3B82F6; margin-bottom: 10px; }
        .score-section { background: linear-gradient(135deg, #3B82F6 0%, #F59E0B 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 30px 0; }
        .score { font-size: 48px; font-weight: bold; margin-bottom: 10px; }
        .category { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; }
        .section { margin: 30px 0; padding: 20px; border-left: 4px solid #3B82F6; background: #f8fafc; }
        .section h3 { color: #3B82F6; margin-top: 0; }
        .recommendations li, .next-steps li, .risks li, .opportunities li { margin: 8px 0; }
        .contact-section { background: #1e293b; color: white; padding: 30px; border-radius: 15px; margin-top: 40px; }
        .contact-section h3 { color: #60A5FA; margin-top: 0; }
        .about-section { background: #f1f5f9; padding: 25px; border-radius: 10px; margin: 30px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; }
        ul { padding-left: 20px; }
        ${comments ? '.comments { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; } .comments h4 { color: #92400e; margin-top: 0; }' : ''}
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Smart Factory</div>
        <h1>AI Business Readiness Assessment Results</h1>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <div class="score-section">
        <div class="score">${results?.score}/100</div>
        <div class="category">${results?.category}</div>
        <p style="margin-top: 15px; opacity: 0.9;">Your organization's AI transformation readiness score</p>
    </div>

    <div class="section">
        <h3>📋 Recommendations</h3>
        <ul class="recommendations">
            ${results?.recommendations.map(rec => `<li>${rec}</li>`).join('') || ''}
        </ul>
    </div>

    <div class="section">
        <h3>⏱️ Next Steps</h3>
        <ol class="next-steps">
            ${results?.nextSteps.map(step => `<li>${step}</li>`).join('') || ''}
        </ol>
    </div>

    <div class="section">
        <h3>⚠️ Risk Factors</h3>
        <ul class="risks">
            ${results?.riskFactors.map(risk => `<li>${risk}</li>`).join('') || ''}
        </ul>
    </div>

    <div class="section">
        <h3>🚀 Opportunities</h3>
        <ul class="opportunities">
            ${results?.opportunities.map(opp => `<li>${opp}</li>`).join('') || ''}
        </ul>
    </div>

    ${comments ? `
    <div class="comments">
        <h4>💬 Additional Comments</h4>
        <p>${comments.replace(/\n/g, '<br>')}</p>
    </div>
    ` : ''}

    <div class="about-section">
        <h3>About Smart Factory</h3>
        <p>Smart Factory is a leading consulting firm specializing in AI-driven business transformation. With over <strong>15 years of excellence</strong>, we've helped organizations across industries achieve measurable results through our proven methodologies and expert teams.</p>
        <p><strong>Our Smart Suite™ consulting teams</strong> work seamlessly together to deliver comprehensive enterprise transformation with measurable ROI and strategic impact. We combine human expertise with cutting-edge AI technology to accelerate your transformation journey.</p>
    </div>

    <div class="contact-section">
        <h3>Ready to Transform Your Business?</h3>
        <p>Based on your assessment results, Smart Factory can help you accelerate your transformation journey. Our team of experts is ready to work with you.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 25px;">
            <div>
                <h4 style="color: #60A5FA; margin-bottom: 10px;">📅 Schedule a Consultation</h4>
                <p style="margin: 0; font-size: 14px;">Book directly through our calendar system:<br>
                <a href="https://outlook.office365.com/owa/calendar/SmartFactoryBusinessReadinessAssessment@smartfactory.io/bookings/" style="color: #93C5FD;">outlook.office365.com/owa/calendar/SmartFactoryBusinessReadinessAssessment@smartfactory.io/bookings/</a></p>
            </div>
            <div>
                <h4 style="color: #60A5FA; margin-bottom: 10px;">📧 Email Us</h4>
                <p style="margin: 0; font-size: 14px;">contact@smartfactory.io</p>
            </div>
            <div>
                <h4 style="color: #60A5FA; margin-bottom: 10px;">📞 Call Us</h4>
                <p style="margin: 0; font-size: 14px;">816-686-7092</p>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>© ${new Date().getFullYear()} Smart Factory. All rights reserved.</p>
        <p>This assessment was generated using Smart Factory's proprietary AI Business Readiness Assessment tool.</p>
    </div>
</body>
</html>`;

    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to download
    const a = document.createElement('a');
    a.href = url;
    a.download = `Smart-Factory-Assessment-Results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Note: The downloaded HTML can be opened in browser and printed/saved as PDF
    setTimeout(() => {
      alert('Results downloaded! Open the HTML file in your browser and use Print > Save as PDF to create a PDF version.');
    }, 500);
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (!showComments) {
      setShowComments(true);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (showComments) {
      setShowComments(false);
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateResults = async () => {
    setIsCalculating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate weighted scores by category
    const categoryScores = {
      infrastructure: 0,
      strategic: 0,
      change: 0,
      technology: 0
    };

    const categoryWeights = {
      infrastructure: 0,
      strategic: 0,
      change: 0,
      technology: 0
    };

    assessmentQuestions.forEach(question => {
      const answer = answers[question.id] || 0;
      const normalizedScore = (answer / (question.options.length - 1)) * 100;
      const weightedScore = normalizedScore * question.weight;
      
      categoryScores[question.category as keyof typeof categoryScores] += weightedScore;
      categoryWeights[question.category as keyof typeof categoryWeights] += question.weight;
    });

    // Calculate final scores
    const finalScores = Object.keys(categoryScores).map(category => ({
      category,
      score: categoryScores[category as keyof typeof categoryScores] / categoryWeights[category as keyof typeof categoryWeights]
    }));

    const overallScore = finalScores.reduce((sum, cat) => sum + cat.score, 0) / finalScores.length;

    // Generate recommendations based on scores
    const recommendations = generateRecommendations(overallScore, finalScores);
    const nextSteps = generateNextSteps(overallScore);
    const riskFactors = generateRiskFactors(finalScores);
    const opportunities = generateOpportunities(finalScores);

    setResults({
      score: Math.round(overallScore),
      category: getReadinessCategory(overallScore),
      recommendations,
      nextSteps,
      riskFactors,
      opportunities
    });

    setIsCalculating(false);
    setIsComplete(true);
  };

  const generateRecommendations = (overallScore: number, categoryScores: {category: string, score: number}[]) => {
    const recs = [];
    
    if (overallScore >= 80) {
      recs.push("Your organization shows excellent readiness for advanced AI implementation");
      recs.push("Consider Smart Factory's AI Accelerator for rapid deployment");
      recs.push("Focus on scaling existing capabilities across business units");
    } else if (overallScore >= 60) {
      recs.push("Strong foundation with targeted improvement opportunities");
      recs.push("Smart Suite consulting can optimize your transformation approach");
      recs.push("Prioritize data integration and team upskilling initiatives");
    } else if (overallScore >= 40) {
      recs.push("Moderate readiness requiring strategic planning and preparation");
      recs.push("Begin with Smart Factory's readiness optimization program");
      recs.push("Focus on infrastructure modernization and change management");
    } else {
      recs.push("Foundational work needed before advanced transformation initiatives");
      recs.push("Start with Smart Factory's transformation foundation program");
      recs.push("Prioritize leadership alignment and basic digital infrastructure");
    }
    
    return recs;
  };

  const generateNextSteps = (score: number) => {
    if (score >= 80) {
      return [
        "Schedule AI Accelerator strategy session",
        "Conduct detailed technical architecture review",
        "Develop 90-day rapid implementation roadmap"
      ];
    } else if (score >= 60) {
      return [
        "Book Smart Suite strategic consultation",
        "Assess current data infrastructure gaps",
        "Create change management and training plan"
      ];
    } else if (score >= 40) {
      return [
        "Schedule transformation readiness workshop",
        "Conduct infrastructure modernization audit",
        "Develop phased approach to digital maturity"
      ];
    } else {
      return [
        "Begin with leadership alignment session",
        "Establish digital transformation baseline",
        "Create foundation-building roadmap"
      ];
    }
  };

  const generateRiskFactors = (categoryScores: {category: string, score: number}[]) => {
    const risks: string[] = [];
    categoryScores.forEach(cat => {
      if (cat.score < 50) {
        switch (cat.category) {
          case 'infrastructure':
            risks.push("Legacy infrastructure may limit transformation speed");
            break;
          case 'strategic':
            risks.push("Strategic alignment gaps could impact ROI");
            break;
          case 'change':
            risks.push("Change resistance may slow adoption");
            break;
          case 'technology':
            risks.push("Technical complexity could increase implementation timeline");
            break;
        }
      }
    });
    return risks.length > 0 ? risks : ["Low risk profile - well positioned for success"];
  };

  const generateOpportunities = (categoryScores: {category: string, score: number}[]) => {
    const opportunities: string[] = [];
    categoryScores.forEach(cat => {
      if (cat.score >= 70) {
        switch (cat.category) {
          case 'infrastructure':
            opportunities.push("Strong infrastructure enables rapid AI deployment");
            break;
          case 'strategic':
            opportunities.push("Clear strategic vision accelerates transformation");
            break;
          case 'change':
            opportunities.push("High change readiness enables aggressive timelines");
            break;
          case 'technology':
            opportunities.push("Advanced technical capabilities unlock innovation");
            break;
        }
      }
    });
    return opportunities.length > 0 ? opportunities : ["Multiple improvement areas offer significant upside potential"];
  };

  const getReadinessCategory = (score: number) => {
    if (score >= 80) return "AI-Ready Enterprise";
    if (score >= 60) return "Transformation-Capable";
    if (score >= 40) return "Development Stage";
    return "Foundation Building";
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setComments('');
    setShowComments(false);
    setIsComplete(false);
    setResults(null);
    setIsCalculating(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Business Readiness Assessment</h2>
                <p className="text-sm text-muted-foreground">Secure • Private • Built by Smart Factory</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {!isComplete ? (
              <div className="p-6">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      {showComments ? 'Comments (Optional)' : `Question ${currentStep + 1} of ${assessmentQuestions.length}`}
                    </span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question or Comments */}
                {!isCalculating ? (
                  <motion.div
                    key={showComments ? 'comments' : currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!showComments ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {assessmentQuestions[currentStep]?.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {assessmentQuestions[currentStep]?.options.map((option, index) => (
                              <motion.button
                                key={index}
                                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                                  answers[assessmentQuestions[currentStep].id] === index
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => handleAnswer(assessmentQuestions[currentStep].id, index)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>

                          {/* Navigation */}
                          <div className="flex justify-between mt-8">
                            <Button
                              variant="outline"
                              onClick={prevQuestion}
                              disabled={currentStep === 0}
                            >
                              <ChevronLeft className="w-4 h-4 mr-2" />
                              Previous
                            </Button>
                            
                            <Button
                              onClick={nextQuestion}
                              disabled={answers[assessmentQuestions[currentStep]?.id] === undefined}
                              className="gradient-primary text-white"
                            >
                              {currentStep === assessmentQuestions.length - 1 ? 'Continue to Comments' : 'Next'}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Additional Comments (Optional)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Label htmlFor="comments" className="text-sm text-muted-foreground">
                              Share any additional context about your organization's transformation goals, 
                              specific challenges, or priorities that would help us provide more tailored recommendations.
                            </Label>
                            <Textarea
                              id="comments"
                              placeholder="Enter any additional comments or context here..."
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                              className="min-h-[120px] resize-none"
                            />
                          </div>

                          {/* Navigation */}
                          <div className="flex justify-between mt-8">
                            <Button
                              variant="outline"
                              onClick={prevQuestion}
                            >
                              <ChevronLeft className="w-4 h-4 mr-2" />
                              Back to Questions
                            </Button>
                            
                            <Button
                              onClick={nextQuestion}
                              className="gradient-primary text-white"
                            >
                              Complete Assessment
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-center py-16">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Analyzing Your Results</h3>
                    <p className="text-muted-foreground">Our AI is processing your responses to generate personalized recommendations...</p>
                  </div>
                )}
              </div>
            ) : (
              /* Results */
              <div className="p-6 space-y-6">
                {/* Score Overview */}
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <motion.div
                        className="text-6xl font-bold text-primary mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        {results?.score}
                      </motion.div>
                      <Badge variant="secondary" className="mb-4">
                        {results?.category}
                      </Badge>
                      <p className="text-muted-foreground">
                        Your organization's AI transformation readiness score
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results?.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results?.nextSteps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">{index + 1}</span>
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Factors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results?.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results?.opportunities.map((opp, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opp}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-3">Ready to Transform Your Results?</h3>
                    <p className="text-muted-foreground mb-6">
                      Based on your assessment, Smart Factory can help you accelerate your transformation journey.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button 
                        className="gradient-primary text-white" 
                        asChild
                      >
                        <a 
                          href="https://outlook.office365.com/owa/calendar/SmartFactoryBusinessReadinessAssessment@smartfactory.io/bookings/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Strategic Consultation
                        </a>
                      </Button>
                      <Button variant="outline" onClick={resetAssessment}>
                        Retake Assessment
                      </Button>
                      <Button variant="ghost" onClick={generatePDF}>
                        <Download className="w-4 h-4 mr-2" />
                        Download Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}