class Label < ActiveRecord::Base
  enum typ: {
    keep: 'keep',
    problem: 'problem',
    try: 'try'
  }

  belongs_to :retrospective
  belongs_to :user, optional: true

  acts_as_list scope: [:retrospective_id, :typ]
end
